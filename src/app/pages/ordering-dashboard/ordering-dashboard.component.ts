import { Component, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Database, ref, onValue, update, remove, push, set, get } from '@angular/fire/database';
import { MenuService } from '../../services/menu.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';
import { firebaseService } from '../../services/restaurant.service';

interface Order {
  name: string;
  quantity: number;
  details?: string;
  choiceEn?: string | null;
  choiceAr?: string | null;
  state?: 'unordered' | 'ordered' | 'ready' | 'done';
  unitPrice?: number;
}

interface Table {
  id: string;
  name: string;
  availability: boolean;
  qrcode: string;
  joinqrcode: string;
  order?: { [key: string]: Order };
}

@Component({
  selector: 'app-ordering-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordering-dashboard.component.html',
  styleUrls: ['./ordering-dashboard.component.css']
})
export class OrderingDashboardComponent implements OnDestroy {
  restaurantId = '';
  restaurantName: string = '';
  restaurant: any = null;
  tables: Table[] = [];
  selectedTable: Table | null = null;
  menuItemNames: string[] = [];
  private categoriesCache: any = null;
  isArabic: boolean = false;
  private subs: Subscription[] = [];
  private tablesUnsub: (() => void) | null = null;
  choiceDraftIndex: { [orderKey: string]: number | null } = {};

  constructor(
    private db: Database,
    private menuService: MenuService,
    private languageService: LanguageService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;

    // ✅ Get restaurant info
    firebaseService.getRestaurantById(this.restaurantId).then(rest => {
      this.restaurant = rest;
      this.updateRestaurantDisplayName();
    }).catch(() => {
      this.restaurant = null;
      this.updateRestaurantDisplayName();
    });

    // ✅ Listen for tables + orders
    const tablesRef = ref(this.db, `restaurants/${this.restaurantId}/tables`);
    this.tablesUnsub = onValue(tablesRef, (snapshot) => {
      this.ngZone.run(() => {
        const data = snapshot.val() || {};
        this.tables = Object.keys(data)
          .map(key => {
            const table = { id: key, ...data[key] };
            if (table.order) {
              const filteredOrders: any = {};
              Object.keys(table.order).forEach(orderKey => {
                const order = table.order[orderKey];
                if (order.state && order.state !== 'unordered') {
                  filteredOrders[orderKey] = order;
                }
              });
              table.order = filteredOrders;
            }
            return table;
          })
          .sort((a, b) => (a.name || '').localeCompare(b.name || '', undefined, { numeric: true }));
        if (this.selectedTable) {
          const updated = this.tables.find(t => t.id === this.selectedTable!.id) || null;
          this.selectedTable = updated;
        }
      });
    });

    // ✅ Load menu
    this.menuService.getCategoriesOnce(this.restaurantId)
      .then(categories => {
        this.categoriesCache = categories;
        this.menuItemNames = this.flattenMenuNames(categories, this.isArabic);
      });

    // ✅ Watch language
    this.subs.push(
      this.languageService.isArabic$.subscribe(isAr => {
        this.isArabic = isAr;
        this.menuItemNames = this.flattenMenuNames(this.categoriesCache, this.isArabic);
        this.updateRestaurantDisplayName();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.tablesUnsub) this.tablesUnsub();
    this.subs.forEach(s => s.unsubscribe());
  }

  selectTable(table: Table) {
    this.selectedTable = table;
  }

  async updateOrder(orderKey: string, quantity: number, details: string) {
    if (!this.selectedTable) return;
    const orderRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${this.selectedTable.id}/order/${orderKey}`);
    if (quantity <= 0) {
      await remove(orderRef);
    } else {
      const currentOrder: any = this.selectedTable.order?.[orderKey];
      const idx = this.choiceDraftIndex[orderKey];
      const patch: any = { quantity, details };
      if (currentOrder && idx !== undefined && idx !== null) {
        const pairs = this.getChoicePairs(currentOrder.name);
        patch.choiceEn = pairs.en[idx] ?? null;
        patch.choiceAr = pairs.ar[idx] ?? null;
        const base = this.getMenuItemPrice(currentOrder.name || '');
        const add = this.getChoiceAddByIndex(currentOrder.name || '', idx);
        patch.unitPrice = base + add;
      }
      await update(orderRef, patch);
      delete this.choiceDraftIndex[orderKey];
    }
  }

  async addOrder(itemName: string, quantity: number, details: string) {
    if (!this.selectedTable || !itemName || quantity <= 0) return;
    const resolvedName = this.resolveNameFromMenu(itemName.trim(), this.isArabic) || itemName.trim();
    const tableRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${this.selectedTable.id}/order`);
    const newKey = Date.now().toString();
    const pairs = this.getChoicePairs(resolvedName);
    const choiceEn = (pairs.en.length ? pairs.en[0] : null) as string | null;
    const choiceAr = (pairs.ar.length ? pairs.ar[0] : null) as string | null;
    const unitPrice = Number((this.findMenuItemByName(resolvedName)?.price) ?? 0);
    await update(tableRef, {
      [newKey]: {
        name: resolvedName,
        quantity,
        details: details || '',
        state: 'ordered',
        choiceEn,
        choiceAr,
        unitPrice,
        ts: Date.now()
      }
    });
  }

  async deleteOrder(orderKey: string) {
    if (!this.selectedTable) return;
    const orderRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${this.selectedTable.id}/order/${orderKey}`);
    await remove(orderRef);
  }

  // === helpers ===
  private getMenuItemPrice(name: string): number {
    const it = this.findMenuItemByName(name);
    return Number(it?.price || 0);
  }

  private getChoiceAddByIndex(name: string, index: number | null): number {
    if (index === null) return 0;
    const list = this.getChoiceDisplayStructured(name);
    return list[index]?.add || 0;
  }

  private resolveNameFromMenu(input: string, isArabic: boolean): string | null {
    if (!this.categoriesCache) return null;
    const lower = input.toLowerCase();
    for (const catKey of Object.keys(this.categoriesCache)) {
      const items = this.categoriesCache[catKey]?.items || {};
      for (const itemKey of Object.keys(items)) {
        const it = items[itemKey];
        if (it.name?.toLowerCase() === lower || it.nameArabic?.toLowerCase() === lower)
          return isArabic ? it.nameArabic || it.name : it.name || it.nameArabic;
      }
    }
    return null;
  }

  private findMenuItemByName(name: string): any | null {
    if (!this.categoriesCache) return null;
    const lower = name.toLowerCase();
    for (const catKey of Object.keys(this.categoriesCache)) {
      const items = this.categoriesCache[catKey]?.items || {};
      for (const itemKey of Object.keys(items)) {
        const it = items[itemKey];
        if (it.name?.toLowerCase() === lower || it.nameArabic?.toLowerCase() === lower)
          return it;
      }
    }
    return null;
  }

  getChoiceDisplayStructured(name: string): { label: string; add: number }[] {
    const it = this.findMenuItemByName(name);
    const opts = Array.isArray(it?.choiceOptions) ? it.choiceOptions : [];
    if (opts.length) {
      return opts.map((o: { en?: string; ar?: string; add?: number }) => ({
      label: this.isArabic ? o.ar || o.en || '' : o.en || o.ar || '',
      add: Number(o.add) || 0
      }));
    }
    return [];
  }

  getChoicePairs(name: string): { en: string[]; ar: string[] } {
    const it = this.findMenuItemByName(name);
    return {
      en: Array.isArray(it?.choices) ? it.choices : [],
      ar: Array.isArray(it?.choicesArabic) ? it.choicesArabic : []
    };
  }

  private flattenMenuNames(categories: any, isArabic: boolean): string[] {
    const names = new Set<string>();
    if (!categories) return [];
    Object.keys(categories).forEach(catKey => {
      const cat = categories[catKey];
      Object.keys(cat.items || {}).forEach(itemKey => {
        const item = cat.items[itemKey];
        const label = isArabic ? item.nameArabic || item.name : item.name || item.nameArabic;
        if (label) names.add(label);
      });
    });
    return Array.from(names);
  }

  private updateRestaurantDisplayName() {
    this.restaurantName = this.isArabic
      ? (this.restaurant?.restArabicName || this.restaurant?.restName)
      : (this.restaurant?.restName || this.restaurant?.restArabicName);
  }

  get restaurantDisplayName(): string {
    return this.restaurantName || this.restaurantId;
  }
}
