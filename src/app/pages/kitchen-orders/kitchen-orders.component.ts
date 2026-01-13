import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Database, ref, onValue, update } from '@angular/fire/database';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';

interface Order {
  name: string;
  quantity: number;
  details?: string;
  category?: string;
  state?: string;
}

@Component({
  selector: 'app-kitchen-orders',
  standalone: true,
  imports: [],
  templateUrl: './kitchen-orders.component.html',
  styleUrls: ['./kitchen-orders.component.css']
})
export class KitchenOrdersComponent implements OnInit, OnDestroy {
  restaurantId = '';
  kitchenOrders: { tableKey: string; tableName: string; orderKey: string; order: Order }[] = [];

  private itemSectionIndex = new Map<string, string>();
  private categoriesSub: Subscription | null = null;
  private tablesUnsub: (() => void) | null = null;

  constructor(
    private db: Database,
    private menuService: MenuService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;
    this.categoriesSub = this.menuService.getCategories(this.restaurantId).subscribe(categories => {
      this.buildItemSectionIndex(categories);
    });

    const tablesRef = ref(this.db, `restaurants/${this.restaurantId}/tables`);
    this.tablesUnsub = onValue(tablesRef, snapshot => {
      const data = snapshot.val() || {};
      const orders: { tableKey: string; tableName: string; orderKey: string; order: Order }[] = [];

      Object.keys(data).forEach(tableKey => {
        const table = data[tableKey];
        const tableOrders = table.order || {};
        Object.keys(tableOrders).forEach(orderKey => {
          const ord: Order = tableOrders[orderKey];
          const section = this.findSectionForOrder(ord);
          if (section === 'kitchen' && ord.state !== 'done'&& ord.state !== 'unordered') {
            orders.push({ tableKey, tableName: table.name || tableKey, orderKey, order: ord });
          }
        });
      });

      this.ngZone.run(() => (this.kitchenOrders = orders));
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSub) this.categoriesSub.unsubscribe();
    if (this.tablesUnsub) this.tablesUnsub();
  }

  private buildItemSectionIndex(categories: any) {
    this.itemSectionIndex.clear();
    if (!categories) return;
    Object.keys(categories).forEach(catKey => {
      const cat = categories[catKey] || {};
      const section = (cat.section || '').toString().trim().toLowerCase();
      const items = cat.items || {};
      Object.keys(items).forEach(itemKey => {
        const item = items[itemKey] || {};
        const nameEn = (item.name || '').toString().trim().toLowerCase();
        const nameAr = (item.nameArabic || '').toString().trim().toLowerCase();
        if (nameEn) this.itemSectionIndex.set(nameEn, section);
        if (nameAr) this.itemSectionIndex.set(nameAr, section);
      });
    });
  }

  private findSectionForOrder(order: Order): string | null {
    const name = (order.name || '').toString().trim().toLowerCase();
    if (!name) return order.category ? order.category.toLowerCase() : null;

    const exact = this.itemSectionIndex.get(name);
    if (exact) return exact;

    for (const [key, section] of this.itemSectionIndex.entries()) {
      if (key.length < 3) continue;
      if (name.includes(key) || key.includes(name)) {
        return section;
      }
    }

    return order.category ? order.category.toLowerCase() : null;
  }

  toggleReady(item: { tableKey: string; orderKey: string; order: Order }): void {
    const newState = item.order.state === 'ready' ? 'ordered' : 'ready';
    const orderRef = ref(this.db, `restaurants/${this.restaurantId}/tables/${item.tableKey}/order/${item.orderKey}`);
    update(orderRef, { state: newState });
  }
}
