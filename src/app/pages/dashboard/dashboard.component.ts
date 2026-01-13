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
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  restaurantId = '';
  restaurantName: string = '';
  restaurant: any = null;
  tables: Table[] = [];
  selectedTable: Table | null = null;
  newTableName: string = '';
  menuItemNames: string[] = [];
  private categoriesCache: any = null;
  isArabic: boolean = false;
  private subs: Subscription[] = [];
  private tablesUnsub: (() => void) | null = null;
  choiceDraftIndex: { [orderKey: string]: number | null } = {};
  isCreatingHistory = false;
  todayHistoryExists = false; // track if record created for today

  // 🧾 Receipt modal
  showReceiptModal = false;
  receiptOrders: Order[] = [];
  receiptTotal = 0;

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

    // load restaurant object and set display name dynamically
    firebaseService.getRestaurantById(this.restaurantId).then(rest => {
      this.restaurant = rest;
      this.updateRestaurantDisplayName();
    }).catch(() => {
      this.restaurant = null;
      this.updateRestaurantDisplayName();
    });

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
          .sort((a, b) =>
            (a.name || '').localeCompare(b.name || '', undefined, { numeric: true, sensitivity: 'base' })
          );

        if (this.selectedTable) {
          const updated = this.tables.find(t => t.id === this.selectedTable!.id) || null;
          this.selectedTable = updated;
        }
      });
    });

    // ✅ check if today's record exists already
    this.checkTodayRecord();

    this.menuService.getCategoriesOnce(this.restaurantId)
      .then(categories => {
        this.categoriesCache = categories;
        this.menuItemNames = this.flattenMenuNames(categories, this.isArabic);
      })
      .catch(() => {
        this.categoriesCache = {};
        this.menuItemNames = [];
      });

    this.subs.push(
      this.languageService.isArabic$.subscribe(isAr => {
        this.isArabic = isAr;
        this.menuItemNames = this.flattenMenuNames(this.categoriesCache, this.isArabic);
        this.updateRestaurantDisplayName();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.tablesUnsub) {
      this.tablesUnsub();
      this.tablesUnsub = null;
    }
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
  }

  private getChoiceAddByIndex(name: string, index: number | null): number {
    if (index === null || index === undefined) return 0;
    const list = this.getChoiceDisplayStructured(name);
    const item = list[index];
    return item ? Number(item.add) || 0 : 0;
  }

  private getMenuItemPrice(name: string): number {
    const it = this.findMenuItemByName(name);
    const p = Number((it?.price as any) ?? 0);
    return isNaN(p) ? 0 : p;
  }

  private resolveNameFromMenu(input: string, isArabic: boolean): string | null {
    if (!this.categoriesCache) return null;
    const lower = input.toLocaleLowerCase();
    let found: any = null;
    Object.keys(this.categoriesCache).some(catKey => {
      const items = this.categoriesCache[catKey]?.items || {};
      return Object.keys(items).some(itemKey => {
        const it = items[itemKey] || {};
        const nameEn = (it.name || '').toString();
        const nameAr = (it.nameArabic || '').toString();
        if (nameEn.toLocaleLowerCase() === lower || nameAr.toLocaleLowerCase() === lower) {
          found = it;
          return true;
        }
        return false;
      });
    });
    if (!found) return null;
    return isArabic ? (found.nameArabic || found.name || null) : (found.name || found.nameArabic || null);
  }

  selectTable(table: Table) {
    this.selectedTable = table;
  }

  async toggleAvailability(table: Table) {
    const tableRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${table.id}`);
    await update(tableRef, { availability: !table.availability });
  }

  async addTable() {
    const name = (this.newTableName || '').trim();
    if (!name) return;
    const tablesRef = ref(this.db, `restaurants/${this.restaurantId}/tables`);
    const newTableRef = push(tablesRef);
    await set(newTableRef, { name, availability: true });
    this.newTableName = '';
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
    try {
      await remove(orderRef);
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  }

  private flattenMenuNames(categories: any, isArabic: boolean): string[] {
    const names = new Set<string>();
    if (!categories) return [];
    Object.keys(categories).forEach(catKey => {
      const cat = categories[catKey];
      const items = cat?.items || {};
      Object.keys(items).forEach(itemKey => {
        const item = items[itemKey] || {};
        const primary = isArabic ? (item.nameArabic || item.name) : (item.name || item.nameArabic);
        if (primary) names.add(String(primary));
      });
    });
    return Array.from(names).sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }

  displayOrderName(storedName: string): string {
    const resolved = this.resolveNameFromMenu(storedName || '', this.isArabic);
    return resolved || storedName;
  }

  displayOrderChoice(order: any): string | null {
    const en = order?.choiceEn ?? null;
    const ar = order?.choiceAr ?? null;
    const label = this.isArabic ? (ar || en) : (en || ar);
    return label || null;
  }

  private findMenuItemByName(name: string): any | null {
    const categories = this.categoriesCache;
    if (!categories || !name) return null;
    const lower = String(name).toLocaleLowerCase();
    let found: any = null;
    Object.keys(categories).some(catKey => {
      const items = categories[catKey]?.items || {};
      return Object.keys(items).some(itemKey => {
        const it = items[itemKey] || {};
        const nameEn = (it.name || '').toString();
        const nameAr = (it.nameArabic || '').toString();
        if (nameEn.toLocaleLowerCase() === lower || nameAr.toLocaleLowerCase() === lower) {
          found = it;
          return true;
        }
        return false;
      });
    });
    return found;
  }

  getChoiceDisplayList(name: string): string[] {
    const it = this.findMenuItemByName(name);
    const primary = this.isArabic ? (it?.choicesArabic as any) : (it?.choices as any);
    let list = Array.isArray(primary) ? primary.filter((x: any) => !!x) : [];
    if (!list.length) {
      const fallback = this.isArabic ? (it?.choices as any) : (it?.choicesArabic as any);
      list = Array.isArray(fallback) ? fallback.filter((x: any) => !!x) : [];
    }
    return list;
  }

  getChoiceDisplayStructured(name: string): { label: string; add: number }[] {
    const it = this.findMenuItemByName(name);
    const opts = Array.isArray((it as any)?.choiceOptions)
      ? ((it as any).choiceOptions as any[])
      : null;
    if (opts && opts.length) {
      return opts.map(o => ({
        label: this.isArabic ? String(o.ar || o.en || '') : String(o.en || o.ar || ''),
        add: Number(o.add) || 0,
      }));
    }
    return this.getChoiceDisplayList(name).map(l => ({ label: l, add: 0 }));
  }

  private getChoicePairs(name: string): { en: string[]; ar: string[] } {
    const it = this.findMenuItemByName(name);
    const en = Array.isArray(it?.choices) ? (it!.choices as string[]) : [];
    const ar = Array.isArray(it?.choicesArabic) ? (it!.choicesArabic as string[]) : [];
    return { en, ar };
  }

  private getSelectedChoiceIndex(order: any): number {
    const { en, ar } = this.getChoicePairs(order?.name || '');
    const targetEn = order?.choiceEn || null;
    const targetAr = order?.choiceAr || null;
    const idxEn = targetEn ? en.findIndex(x => x === targetEn) : -1;
    if (idxEn >= 0) return idxEn;
    const idxAr = targetAr ? ar.findIndex(x => x === targetAr) : -1;
    return idxAr >= 0 ? idxAr : -1;
  }

  getDraftChoiceIndex(orderKey: string, order: any): number {
    const idx = this.choiceDraftIndex[orderKey];
    if (idx === 0 || idx) return idx as number;
    return this.getSelectedChoiceIndex(order);
  }

  setChoiceDraft(orderKey: string, order: any, index: number) {
    this.choiceDraftIndex[orderKey] = index;
  }

  hasOrders(): boolean {
    const t = this.selectedTable as any;
    return !!(t && t.order && Object.keys(t.order).length > 0);
  }

  // === 🧾 RECEIPT LOGIC ===
  openReceiptModal() {
    if (!this.selectedTable?.order) return;
    this.receiptOrders = Object.values(this.selectedTable.order);
    this.receiptTotal = this.getTotalPrice();
    this.showReceiptModal = true;
  }

  closeReceiptModal() {
    this.showReceiptModal = false;
  }

  async processCheckout(action: 'print' | 'done' | 'cancel') {
    if (!this.selectedTable) return;
    if (action === 'cancel') {
      this.closeReceiptModal();
      return;
    }

    // update history counters
    const today = new Date().toISOString().split('T')[0];
    const historyCategoriesRef = ref(this.db, `restaurants/${this.restaurantId}/history/${today}/categories`);
    const historySnap = await get(historyCategoriesRef);
    const historyCats = historySnap.val() || {};

    for (const order of Object.values(this.selectedTable.order || {})) {
      const name = order.name;
      Object.keys(historyCats).forEach(catKey => {
        const cat = historyCats[catKey];
        Object.keys(cat.items || {}).forEach(itemKey => {
          const item = cat.items[itemKey];
          if (item.name === name || item.nameArabic === name) {
            const current = Number(item.counter || 0);
            cat.items[itemKey].counter = current + (Number(order.quantity) || 0);
          }
        });
      });
    }

    await update(historyCategoriesRef, historyCats);

    // ✅ Create an invoice log under Order_List with a sequential invoice number
    try {
      const todayKey = today; // yyyy-mm-dd
      const metaRef = ref(this.db, `restaurants/${this.restaurantId}/meta/lastInvoiceNumber`);
      const lastSnap = await get(metaRef);
      const lastNum = lastSnap.exists() ? Number(lastSnap.val()) : 0;
      const invoiceId = isFinite(lastNum) ? lastNum + 1 : 1;

      const ordersObj = this.selectedTable.order || {};
      const itemsPayload: any = {};
      Object.keys(ordersObj).forEach(k => {
        const o: any = ordersObj[k];
        // compute final unit price (base + add if any)
        const unit = this.getOrderUnitPrice(o as any);
        itemsPayload[k] = {
          name: o.name,
          quantity: Number(o.quantity) || 0,
          unitPrice: unit,
          choiceEn: o.choiceEn ?? null,
          choiceAr: o.choiceAr ?? null,
          state: o.state || 'done',
        };
      });

      const invoicePayload = {
        id: invoiceId,
        tableId: this.selectedTable.id,
        tableName: this.selectedTable.name || '',
        items: itemsPayload,
        total: this.getTotalPrice(),
        createdAt: Date.now()
      } as any;

      const orderListRef = ref(this.db, `restaurants/${this.restaurantId}/history/${todayKey}/Order_List/${invoiceId}`);
      await set(orderListRef, invoicePayload);
      await set(metaRef, invoiceId);
    } catch (err) {
      console.error('Failed to write invoice:', err);
    }

    // clear orders
    const tableId = this.selectedTable.id;
    const tableRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${tableId}`);
    const ordersRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${tableId}/order`);
    await update(tableRef, { availability: true });
    await remove(ordersRef);

    this.selectedTable = { ...this.selectedTable, availability: true, order: {} } as any;

    if (action === 'print') {
      alert(this.isArabic ? '🖨 تم الطباعة بنجاح!' : '🖨 Printed successfully!');
    }

    this.closeReceiptModal();
  }

  async checkoutSelectedTable() {
    if (!this.selectedTable) return;
    this.openReceiptModal();
  }

  getTotalPrice(): number {
    if (!this.selectedTable?.order) return 0;
    const orders = Object.values(this.selectedTable.order) as any[];
    return orders
      .filter(o => ['ordered', 'ready', 'done'].includes(o.state))
      .reduce((sum, o) => {
        const unit = this.getOrderUnitPrice(o);
        return sum + unit * (Number(o.quantity) || 0);
      }, 0);
  }

  getOrderUnitPrice(o: Order): number {
    let unit = Number((o as any).unitPrice ?? NaN);
    if (!isNaN(unit) && unit > 0) return unit;
    const base = this.getMenuItemPrice((o as any).name || '');
    const structured = this.getChoiceDisplayStructured((o as any).name || '');
    const selectedLabel = this.displayOrderChoice(o as any);
    const match = structured.find(x => x.label === selectedLabel);
    const add = match ? Number(match.add) || 0 : 0;
    return base + add;
  }

  get restaurantDisplayName(): string {
    return this.restaurantName || this.restaurantId;
  }

  private updateRestaurantDisplayName() {
    const name = this.isArabic
      ? (this.restaurant?.restArabicName || this.restaurant?.restName || '')
      : (this.restaurant?.restName || this.restaurant?.restArabicName || '');
    this.restaurantName = String(name || '').trim();
  }

  markAsDone(item: { tableKey: string; orderKey: string; order: Order }) {
    const orderRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${item.tableKey}/order/${item.orderKey}`);
    update(orderRef, { state: 'done' });
  }

  private async checkTodayRecord() {
    const today = new Date().toISOString().split('T')[0];
    const historyRef = ref(this.db, `restaurants/${this.restaurantId}/history/${today}`);
    const snap = await get(historyRef);
    this.todayHistoryExists = snap.exists() && !snap.val().closed;
  }

  async handleDailyRecord(): Promise<void> {
    const today = new Date();
    const dateKey = today.toISOString().split('T')[0];
    const dateValue = today.toISOString();
    const historyRef = ref(this.db, `restaurants/${this.restaurantId}/history/${dateKey}`);

    if (!this.todayHistoryExists) {
      if (this.isCreatingHistory) return;
      this.isCreatingHistory = true;
      try {
        const menuRef = ref(this.db, `restaurants/${this.restaurantId}/menu/categories`);
        const snap = await get(menuRef);
        if (!snap.exists()) {
          alert('⚠️ No menu found.');
          this.isCreatingHistory = false;
          return;
        }
        const menuCategories = snap.val();
        const categoriesForHistory: any = {};

        Object.keys(menuCategories).forEach(catKey => {
          const cat = menuCategories[catKey];
          const items = cat.items || {};
          const historyItems: any = {};
          Object.keys(items).forEach(itemKey => {
            const item = items[itemKey];
            historyItems[itemKey] = { counter: 0, name: item.name || '', price: item.price || 0 };
          });
          categoriesForHistory[catKey] = { items: historyItems };
        });

        const record = {
          categories: categoriesForHistory,
          date: dateValue,
          discounts: {
            type1: { value: 0 },
            type2: { value: 0 },
            type3: { value: 0 }
          },
          total: 0,
          closed: false
        };
        await set(historyRef, record);
        this.todayHistoryExists = true;
        alert(this.isArabic ? 'تم إنشاء سجل اليوم الجديد ✅' : '✅ Daily record created successfully!');
      } catch (err) {
        console.error('Failed to create record:', err);
        alert('❌ Failed to create record.');
      } finally {
        this.isCreatingHistory = false;
      }
    } else {
      const confirmMsg = this.isArabic
        ? 'هل أنت متأكد أنك تريد إغلاق سجل هذا اليوم؟'
        : 'Are you sure you want to close today’s record?';
      const ok = window.confirm(confirmMsg);
      if (!ok) return;
      await update(historyRef, { closed: true });
      this.todayHistoryExists = false;
      alert(this.isArabic ? '✅ تم إغلاق سجل اليوم بنجاح.' : '✅ Daily record closed successfully.');
    }
  }
}
