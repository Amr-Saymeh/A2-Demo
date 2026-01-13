import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ref, get, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { LanguageService } from '../../services/language.service';
import { firebaseService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';

declare const Chart: any;

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatOptionModule],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('220ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('180ms ease-in', style({ height: 0, opacity: 0 }))
      ])
    ])
  ]
})
export class StatsComponent implements OnInit, AfterViewInit, OnDestroy {
  restaurantId = '';
  restaurant: any = null;
  restaurantName = '';
  isArabic = false;

  now = new Date();
  clockInterval: any;

  overview = {
    employeesBalance: 0,
    suppliersBalance: 0,
    customersBalance: 0,
    bankBalances: 0,
    checksBalance: 0,
    cashOnHand: 0,
    totalExpenses: 0,
    totalPurchases: 0,
    totalDiscounts: 0,
    salesRevenue: 0,
  } as any;

  counts = {
    invoicesToDate: 0,
    tableCount: 0,
    customerCount: 0,
    itemCount: 0,
    employeeCount: 0,
    categoryCount: 0,
  } as any;

  timeScale: 'day' | 'week' | 'month' | 'year' = 'day';
  revenueScale: 'day' | 'week' | 'month' | 'year' = 'day';
  categoryScale: 'day' | 'week' | 'month' | 'year' = 'day';
  typeScale: 'day' | 'week' | 'month' | 'year' = 'day';
  itemsScale: 'day' | 'week' | 'month' | 'year' = 'day';

  categories: any = {};
  categoryList: { key: string; label: string; section?: string }[] = [];
  selectedCategoryKey: string = 'all';
  categorySearch = '';
  private itemCatMap: Record<string, string> = {};

  selectedType: string = 'all';
  typeSearch = '';
  typeOptions = [
    { value: 'all', labelEn: 'All', labelAr: 'الكل' },
    { value: 'kitchen', labelEn: 'Kitchen', labelAr: 'المطبخ' },
    { value: 'bar', labelEn: 'Bar', labelAr: 'البار' },
    { value: 'hookah', labelEn: 'Hookah', labelAr: 'الأرجيلة' },
    { value: 'other', labelEn: 'Other', labelAr: 'أخرى' }
  ];

  history: any = {};

  @ViewChild('revenueChartCanvas') revenueChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoryChartCanvas') categoryChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('typeChartCanvas') typeChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('discountChartCanvas') discountChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('itemsChartCanvas') itemsChartCanvas?: ElementRef<HTMLCanvasElement>;

  revenueChart: any;
  categoryChart: any;
  typeChart: any;
  discountChart: any;
  itemsChart: any;

  selectedOrdersDate = this.formatDateKey(new Date());
  orders: any[] = [];
  orderSearch = '';
  orderPageSize = 10;
  expandedOrders: Record<string, boolean> = {};
  ordersDate: Date | null = null;

  selectedItemsCategoryKey: string = '';

  private ordersUnsub: (() => void) | null = null;
  private historyUnsub: (() => void) | null = null;
  private tablesUnsub: (() => void) | null = null;
  private liveTablesSnapshot: any = {};
  private ordersByKey: Record<string, any[]> = {};

  constructor(
    private route: ActivatedRoute,
    private lang: LanguageService,
    private menu: MenuService,
  ) {}

  ngOnInit(): void {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;

    this.lang.isArabic$.subscribe(v => {
      this.isArabic = v;
      this.updateRestaurantDisplayName();
      this.updateCategoryListLabels();
      this.refreshAllCharts();
    });

    firebaseService.getRestaurantById(this.restaurantId).then(r => {
      this.restaurant = r;
      this.updateRestaurantDisplayName();
    }).catch(() => {
      this.restaurant = null;
      this.updateRestaurantDisplayName();
    });

    this.menu.getCategoriesOnce(this.restaurantId).then(c => {
      this.categories = c || {};
      this.categoryList = Object.keys(this.categories).map(k => ({
        key: k,
        label: this.isArabic ? (this.categories[k]?.nameArabic || this.categories[k]?.name || k) : (this.categories[k]?.name || this.categories[k]?.nameArabic || k),
        section: this.categories[k]?.section || 'kitchen'
      }));
      this.countItems();
      this.buildItemCatMap();
      if (!this.selectedItemsCategoryKey && this.categoryList.length) {
        this.selectedItemsCategoryKey = this.categoryList[0].key;
      }
      if (this.itemsChartCanvas?.nativeElement) {
        setTimeout(() => this.refreshAllCharts(), 0);
      }
    });

    this.loadCounts();
    this.observeHistory();

    this.clockInterval = setInterval(() => {
      this.now = new Date();
    }, 1000);

    this.observeOrdersForDate(this.selectedOrdersDate);
    this.observeLiveTables();
  }

  private getItemsInCategoryDataset(scale: 'day' | 'week' | 'month' | 'year', catKey: string) {
    const buckets = this.bucketize(scale);
    const qtyByKey: Record<string, number> = {};
    const revByKey: Record<string, number> = {};
    const addByKey = (key: string, qty: number, rev: number) => {
      qtyByKey[key] = (qtyByKey[key] || 0) + qty;
      revByKey[key] = (revByKey[key] || 0) + rev;
    };
    buckets.forEach(b => {
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        const cat = day?.categories?.[catKey];
        if (cat && cat.items) {
          const items = cat.items || {};
          let added = 0;
          Object.keys(items).forEach(itKey => {
            const it = items[itKey] || {};
            const cnt = Number(it.counter || 0);
            const price = Number(it.price || 0);
            addByKey(itKey, cnt, price * cnt);
            added += cnt;
          });
          if (added === 0) {
            const orders = this.getOrdersForKey(day, k);
            orders.forEach(o => {
              const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
              Object.keys(its).forEach(itKey => {
                const it = its[itKey] || {};
                const catFromName = this.getCategoryKeyByItemName(it?.name || '');
                if (catFromName !== catKey) return;
                const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
                const price = Number(it.unitPrice ?? it.price ?? 0);
                const norm = this.normalizeName(it?.name || it?.nameArabic || itKey);
                addByKey(norm, cnt, price * cnt);
              });
            });
          }
        } else {
          const orders = this.getOrdersForKey(day, k);
          orders.forEach(o => {
            const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
            Object.keys(its).forEach(itKey => {
              const it = its[itKey] || {};
              const catFromName = this.getCategoryKeyByItemName(it?.name || '');
              if (catFromName !== catKey) return;
              const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
              const price = Number(it.unitPrice ?? it.price ?? 0);
              const norm = this.normalizeName(it?.name || it?.nameArabic || itKey);
              addByKey(norm, cnt, price * cnt);
            });
          });
        }
      });
    });
    // Build labels by mapping keys to menu items
    const finalQtyByLabel: Record<string, number> = {};
    const finalRevByLabel: Record<string, number> = {};
    Object.keys(qtyByKey).forEach(key => {
      let label: string;
      if (this.idToItem[key]) {
        const it = this.idToItem[key];
        label = this.isArabic ? (it.nameArabic || it.name || key) : (it.name || it.nameArabic || key);
      } else if (this.nameToItem[key]) {
        const it = this.nameToItem[key];
        label = this.isArabic ? (it.nameArabic || it.name || key) : (it.name || it.nameArabic || key);
      } else {
        label = key;
      }
      finalQtyByLabel[label] = (finalQtyByLabel[label] || 0) + (qtyByKey[key] || 0);
      finalRevByLabel[label] = (finalRevByLabel[label] || 0) + (revByKey[key] || 0);
    });
    const labels = Object.keys(finalQtyByLabel);
    const values = labels.map(l => finalQtyByLabel[l]);
    const colors = labels.map(lbl => this.colorForLabel(lbl));
    return { labels, values, colors, revenueByLabel: finalRevByLabel } as any;
  }

  private buildItemCatMap() {
    const m: Record<string, string> = {};
    const nameMap: Record<string, string> = {};
    const itemMap: Record<string, { name?: string; nameArabic?: string }> = {};
    Object.keys(this.categories || {}).forEach(catKey => {
      const items = this.categories?.[catKey]?.items || {};
      Object.keys(items).forEach(itKey => {
        m[itKey] = catKey;
        const it = items[itKey] || {};
        const en = this.normalizeName(it.name || '');
        const ar = this.normalizeName(it.nameArabic || '');
        if (en) nameMap[en] = catKey;
        if (ar) nameMap[ar] = catKey;
        if (en) itemMap[en] = { name: it.name || '', nameArabic: it.nameArabic || '' };
        if (ar) itemMap[ar] = { name: it.name || '', nameArabic: it.nameArabic || '' };
        this.idToItem[itKey] = { name: it.name || '', nameArabic: it.nameArabic || '' };
      });
    });
    this.itemCatMap = m;
    this.nameToCatMap = nameMap;
    this.nameToItem = itemMap;
  }

  private getCategoryKeyByItemName(name: string): string | undefined {
    return this.nameToCatMap[this.normalizeName(name || '')];
  }

  private aggregateLiveTableOrdersByItem(): Record<string, any> {
    const agg: Record<string, { name: string; nameArabic?: string; unitPrice: number; quantity: number }> = {};
    const tables = this.liveTablesSnapshot || {};
    Object.keys(tables).forEach(tk => {
      const orders = tables[tk]?.order || {};
      Object.keys(orders).forEach(ok => {
        const o = orders[ok] || {};
        if (o.state === 'unordered') return;
        const nm = String(o.name || '');
        const key = this.normalizeName(nm);
        const unit = Number(o.unitPrice ?? 0) || 0;
        const qty = Number(o.quantity ?? 0) || 0;
        if (!agg[key]) {
          const probe = this.nameToItem[key];
          agg[key] = { name: nm, nameArabic: probe?.nameArabic || undefined, unitPrice: unit, quantity: 0 };
        }
        agg[key].quantity += qty;
      });
    });
    const items: Record<string, any> = {};
    Object.keys(agg).forEach(k => {
      const a = agg[k];
      items[k] = { name: a.name, nameArabic: a.nameArabic, unitPrice: a.unitPrice, quantity: a.quantity };
    });
    return items;
  }

  private getOrdersForKey(day: any, key?: string): any[] {
    const invoices = this.getDayInvoices(day);
    const todayKey = this.formatDateKey(new Date());
    if (key && key === todayKey) {
      const liveItems = this.aggregateLiveTableOrdersByItem();
      if (Object.keys(liveItems).length) {
        invoices.push({ id: 'live', items: liveItems });
      }
    }
    return invoices;
  }

  private getDayInvoices(day: any): any[] {
    const src = day?.Order_List || {};
    return Object.keys(src).map(id => ({ id, ...(src[id] || {}) }));
  }

  private observeLiveTables() {
    const r = ref(db, `restaurants/${this.restaurantId}/tables`);
    this.tablesUnsub = onValue(r, snap => {
      this.liveTablesSnapshot = snap.exists() ? snap.val() : {};
      this.refreshAllCharts();
    });
  }

  private normalizeName(s: string): string { return String(s || '').trim().toLocaleLowerCase(); }
  private nameToCatMap: Record<string, string> = {};
  private nameToItem: Record<string, { name?: string; nameArabic?: string }> = {};
  private idToItem: Record<string, { name?: string; nameArabic?: string }> = {};
  private itemLabel(it: any, key: string): string {
    const nameEn = String(it?.name || '').trim();
    const nameAr = String(it?.nameArabic || '').trim();
    let label = this.isArabic ? (nameAr || nameEn) : (nameEn || nameAr);
    if (label) return label;
    const probe = this.nameToItem[this.normalizeName(nameEn || nameAr)];
    if (probe) return this.isArabic ? (probe.nameArabic || probe.name || key) : (probe.name || probe.nameArabic || key);
    return key;
  }

  private updateCategoryListLabels() {
    this.categoryList = Object.keys(this.categories || {}).map(k => ({
      key: k,
      label: this.isArabic ? (this.categories[k]?.nameArabic || this.categories[k]?.name || k) : (this.categories[k]?.name || this.categories[k]?.nameArabic || k),
      section: this.categories[k]?.section || 'kitchen'
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.refreshAllCharts(), 0);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) clearInterval(this.clockInterval);
    if (this.ordersUnsub) this.ordersUnsub();
    if (this.historyUnsub) this.historyUnsub();
    if (this.tablesUnsub) this.tablesUnsub();
    this.destroyCharts();
  }

  private updateRestaurantDisplayName() {
    const name = this.isArabic ? (this.restaurant?.restArabicName || this.restaurant?.restName || '') : (this.restaurant?.restName || this.restaurant?.restArabicName || '');
    this.restaurantName = String(name || '').trim();
  }

  private async loadCounts() {
    const tablesSnap = await get(ref(db, `restaurants/${this.restaurantId}/tables`));
    const tables = tablesSnap.exists() ? tablesSnap.val() : {};
    this.counts.tableCount = Object.keys(tables).length;

    const employeesSnap = await get(ref(db, `restaurants/${this.restaurantId}/employees`));
    const employees = employeesSnap.exists() ? employeesSnap.val() : {};
    this.counts.employeeCount = Object.keys(employees).length;

    const customersSnap = await get(ref(db, `restaurants/${this.restaurantId}/customers`));
    const customers = customersSnap.exists() ? customersSnap.val() : {};
    this.counts.customerCount = Object.keys(customers).length;

    const invoicesSnap = await get(ref(db, `restaurants/${this.restaurantId}/meta/lastInvoiceNumber`));
    const inv = invoicesSnap.exists() ? Number(invoicesSnap.val()) : 0;
    this.counts.invoicesToDate = isFinite(inv) ? inv : 0;

    const financeSnap = await get(ref(db, `restaurants/${this.restaurantId}/finance`));
    const finance = financeSnap.exists() ? financeSnap.val() : {};
    this.overview.employeesBalance = Number(finance.employeesBalance ?? 0) || 0;
    this.overview.suppliersBalance = Number(finance.suppliersBalance ?? 0) || 0;
    this.overview.customersBalance = Number(finance.customersBalance ?? 0) || 0;
    this.overview.bankBalances = Number(finance.bankBalances ?? 0) || 0;
    this.overview.checksBalance = Number(finance.checksBalance ?? 0) || 0;
    this.overview.cashOnHand = Number(finance.cashOnHand ?? 0) || 0;
    this.overview.totalExpenses = Number(finance.totalExpenses ?? 0) || 0;
    this.overview.totalPurchases = Number(finance.totalPurchases ?? 0) || 0;
  }

  private countItems() {
    let count = 0;
    Object.keys(this.categories || {}).forEach(catKey => {
      const items = this.categories[catKey]?.items || {};
      count += Object.keys(items).length;
    });
    this.counts.itemCount = count;
    this.counts.categoryCount = Object.keys(this.categories || {}).length;
  }

  private observeHistory() {
    if (this.historyUnsub) { this.historyUnsub(); this.historyUnsub = null; }
    const r = ref(db, `restaurants/${this.restaurantId}/history`);
    this.historyUnsub = onValue(r, snap => {
      this.history = snap.exists() ? snap.val() : {};
      // Ensure today's bucket exists so live orders are included
      const todayKey = this.formatDateKey(new Date());
      if (!this.history[todayKey]) this.history[todayKey] = { Order_List: {} };
      const totals = this.computeTotalsForRange('day');
      this.overview.totalDiscounts = totals.totalDiscounts;
      this.overview.salesRevenue = totals.revenue;
      this.refreshAllCharts();
    });
  }

  private destroyCharts() {
    if (this.revenueChart) { this.revenueChart.destroy(); this.revenueChart = null; }
    if (this.categoryChart) { this.categoryChart.destroy(); this.categoryChart = null; }
    if (this.typeChart) { this.typeChart.destroy(); this.typeChart = null; }
    if (this.discountChart) { this.discountChart.destroy(); this.discountChart = null; }
    if (this.itemsChart) { this.itemsChart.destroy(); this.itemsChart = null; }
  }

  onTimeScaleChange() {
    this.refreshAllCharts();
  }

  onCategorySearch(e: any) {
    this.categorySearch = e?.target?.value || '';
  }

  onTypeSearch(e: any) {
    this.typeSearch = e?.target?.value || '';
  }

  refreshAllCharts() {
    if (!this.history) return;
    this.destroyCharts();
    const revenue = this.getRevenueSeries(this.revenueScale);
    const rctx = this.revenueChartCanvas.nativeElement.getContext('2d')!;
    const valueLabelPlugin = {
      id: 'valueLabels',
      afterDatasetsDraw: (chart: any) => {
        const { ctx } = chart;
        const ds = chart.data.datasets?.[0];
        const meta = chart.getDatasetMeta(0);
        if (!ds || !meta) return;
        ctx.save();
        ctx.fillStyle = '#111827';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';
        meta.data.forEach((bar: any, i: number) => {
          const raw = Number(ds.data?.[i] ?? 0) || 0;
          const label = '₪ ' + new Intl.NumberFormat(this.isArabic ? 'ar' : 'en-US', { maximumFractionDigits: 0 }).format(raw);
          const x = bar?.x ?? 0;
          const y = bar?.y ?? 0;
          ctx.fillText(label, x, y - 6);
        });
        ctx.restore();
      }
    };
    const baseBarOptions = this.chartOptions(true);
    const maxVal = Math.max(0, ...(revenue.values || [0]));
    const revenueOptions = {
      ...baseBarOptions,
      layout: { ...(baseBarOptions as any).layout, padding: { ...((baseBarOptions as any).layout?.padding || {}), top: 48 } },
      scales: { ...(baseBarOptions as any).scales, y: { ...((baseBarOptions as any).scales?.y || {}), suggestedMax: Math.ceil(maxVal * 1.3) } }
    } as any;
    this.revenueChart = new Chart(rctx, {
      type: 'bar',
      data: {
        labels: revenue.labels,
        datasets: [{
          label: this.isArabic ? 'الإيرادات' : 'Revenue',
          data: revenue.values,
          backgroundColor: '#6366f1',
          borderRadius: 6,
          maxBarThickness: 32
        }]
      },
      options: revenueOptions,
      plugins: [valueLabelPlugin]
    });

    const cat = this.getCategoryDataset(this.categoryScale, this.selectedCategoryKey);
    this.categoryChart = new Chart(this.categoryChartCanvas.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: cat.labels,
        datasets: [{
          label: this.isArabic ? 'الكمية' : 'Quantity',
          data: cat.values,
          backgroundColor: cat.colors,
          revenueByLabel: cat.revenueByLabel || {}
        }]
      },
      options: {
        ...this.pieOptions(),
        plugins: {
          ...this.pieOptions().plugins,
          tooltip: {
            ...this.pieOptions().plugins.tooltip,
            callbacks: {
              label: (ctx: any) => {
                const isAr = this.isArabic;
                const qty = Number(ctx.parsed || 0) || 0;
                const label = String(ctx.label || '');
                const revMap = (ctx.dataset as any).revenueByLabel || {};
                const rev = Number(revMap[label] || 0) || 0;
                const qtyText = isAr ? 'الكمية' : 'Quantity';
                const totalText = isAr ? 'الإجمالي' : 'Total';
                const revFmt = '₪ ' + new Intl.NumberFormat(isAr ? 'ar' : 'en-US', { maximumFractionDigits: 0 }).format(rev);
                return `${qtyText}: ${qty} • ${totalText}: ${revFmt}`;
              }
            }
          }
        }
      }
    });

    const typ = this.getTypeDataset(this.typeScale, this.selectedType);
    this.typeChart = new Chart(this.typeChartCanvas.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: typ.labels,
        datasets: [{
          label: this.isArabic ? 'الكمية' : 'Quantity',
          data: typ.values,
          backgroundColor: typ.colors,
          revenueByLabel: typ.revenueByLabel || {}
        }]
      },
      options: {
        ...this.pieOptions(),
        plugins: {
          ...this.pieOptions().plugins,
          tooltip: {
            ...this.pieOptions().plugins.tooltip,
            callbacks: {
              label: (ctx: any) => {
                const isAr = this.isArabic;
                const qty = Number(ctx.parsed || 0) || 0;
                const label = String(ctx.label || '');
                const revMap = (ctx.dataset as any).revenueByLabel || {};
                const rev = Number(revMap[label] || 0) || 0;
                const qtyText = isAr ? 'الكمية' : 'Qty';
                const totalText = isAr ? 'الإجمالي' : 'Total';
                const revFmt = '₪ ' + new Intl.NumberFormat(isAr ? 'ar' : 'en-US', { maximumFractionDigits: 0 }).format(rev);
                return `${qtyText}: ${qty} • ${totalText}: ${revFmt}`;
              }
            }
          }
        }
      }
    });

    if (this.discountChartCanvas?.nativeElement) {
      const dis = this.getDiscountsDataset(this.timeScale);
      this.discountChart = new Chart(this.discountChartCanvas.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
          labels: dis.labels,
          datasets: dis.datasets
        },
        options: {
          ...this.chartOptions(true),
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10 } } },
          scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, ticks: { callback: (v: any) => String(v) } } }
        }
      });
    }

    // Items by selected category (quantity)
    if (this.itemsChartCanvas?.nativeElement && this.selectedItemsCategoryKey) {
      const itm = this.getItemsInCategoryDataset(this.itemsScale, this.selectedItemsCategoryKey);
      this.itemsChart = new Chart(this.itemsChartCanvas.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: itm.labels,
          datasets: [{
            label: this.isArabic ? 'الكمية' : 'Quantity',
            data: itm.values,
            backgroundColor: itm.colors,
            revenueByLabel: itm.revenueByLabel || {}
          }]
        },
        options: {
          ...this.pieOptions(),
          plugins: {
            ...this.pieOptions().plugins,
            tooltip: {
              ...this.pieOptions().plugins.tooltip,
              callbacks: {
                label: (ctx: any) => {
                  const isAr = this.isArabic;
                  const qty = Number(ctx.parsed || 0) || 0;
                  const label = String(ctx.label || '');
                  const revMap = (ctx.dataset as any).revenueByLabel || {};
                  const rev = Number(revMap[label] || 0) || 0;
                  const qtyText = isAr ? 'الكمية' : 'Qty';
                  const totalText = isAr ? 'الإجمالي' : 'Total';
                  const revFmt = '₪ ' + new Intl.NumberFormat(isAr ? 'ar' : 'en-US', { maximumFractionDigits: 0 }).format(rev);
                  return `${qtyText}: ${qty} • ${totalText}: ${revFmt}`;
                }
              }
            }
          }
        }
      });
    }
  }

  private chartOptions(isBar = false): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeOutQuart' },
      layout: isBar ? { padding: { top: 20 } } : undefined,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false, padding: 10, backgroundColor: 'rgba(17,24,39,.9)' }
      },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 0 } },
        y: { grid: { color: 'rgba(0,0,0,.06)', drawBorder: false }, ticks: { callback: (v: any) => String(v) } }
      },
      elements: isBar ? { bar: { borderSkipped: false } } : { line: { borderWidth: 2 } }
    };
  }

  private pieOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeOutQuart' },
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { padding: 10, backgroundColor: 'rgba(17,24,39,.9)' }
      },
      cutout: '55%'
    };
  }

  private makeGradient(ctx: CanvasRenderingContext2D, color: string) {
    const { height } = ctx.canvas;
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, this.alpha(color, 0.35));
    grad.addColorStop(1, this.alpha(color, 0));
    return grad;
  }

  private alpha(hex: string, a: number) {
    // expects #RRGGBB
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  private computeTotalsForRange(scale: 'day' | 'week' | 'month' | 'year') {
    const buckets = this.bucketize(scale);
    let revenue = 0;
    let totalDiscounts = 0;
    buckets.forEach(b => {
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        const rev = this.computeDayRevenue(day, k);
        revenue += rev;
        const dis = this.sumDiscounts(day?.discounts || {});
        totalDiscounts += dis;
      });
    });
    return { revenue, totalDiscounts };
  }

  private getRevenueSeries(scale: 'day' | 'week' | 'month' | 'year') {
    const buckets = this.bucketize(scale);
    const labels: string[] = [];
    const values: number[] = [];
    buckets.forEach(b => {
      let v = 0;
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        v += this.computeDayRevenue(day, k);
      });
      labels.push(b.label);
      values.push(v);
    });
    return { labels, values };
  }

  private getCategoryDataset(scale: 'day' | 'week' | 'month' | 'year', categoryKey: string) {
    const map: Record<string, number> = {};
    const revMapByLabel: Record<string, number> = {};
    const buckets = this.bucketize(scale);
    if (categoryKey && categoryKey !== 'all') {
      const label = this.getCategoryLabel(categoryKey);
      let total = 0;
      let totalRev = 0;
      buckets.forEach(b => {
        b.keys.forEach(k => {
          const day = this.history[k];
          if (!day) return;
          total += this.sumCategory(day, categoryKey, k);
          totalRev += this.sumCategoryRevenue(day, categoryKey, k);
        });
      });
      revMapByLabel[label] = totalRev;
      return { labels: [label], values: [total], colors: [this.colorForLabel(label)], revenueByLabel: revMapByLabel } as any;
    } else {
      Object.keys(this.categories || {}).forEach(catKey => map[catKey] = 0);
      const revPerCatKey: Record<string, number> = {};
      Object.keys(this.categories || {}).forEach(catKey => revPerCatKey[catKey] = 0);
      buckets.forEach(b => {
        b.keys.forEach(k => {
          const day = this.history[k];
          if (!day) return;
          Object.keys(map).forEach(catKey => {
            map[catKey] += this.sumCategory(day, catKey, k);
            revPerCatKey[catKey] += this.sumCategoryRevenue(day, catKey, k);
          });
        });
      });
      const keys = Object.keys(map);
      const labels = keys.map(k => this.getCategoryLabel(k));
      const values = keys.map(k => map[k]);
      labels.forEach((lbl, idx) => { revMapByLabel[lbl] = revPerCatKey[keys[idx]] || 0; });
      const colors = labels.map(lbl => this.colorForLabel(lbl));
      return { labels, values, colors, revenueByLabel: revMapByLabel } as any;
    }
  }

  private getTypeDataset(scale: 'day' | 'week' | 'month' | 'year', type: string) {
    const typeMap: Record<string, number> = {};
    const revMap: Record<string, number> = {};
    const buckets = this.bucketize(scale);
    const allTypes = ['kitchen','bar','hookah','other'];
    allTypes.forEach(t => { typeMap[t] = 0; revMap[t] = 0; });
    buckets.forEach(b => {
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        const cats = day?.categories || {};
        if (Object.keys(cats).length) {
          Object.keys(cats).forEach(catKey => {
            const sec = (this.categories?.[catKey]?.section) || 'kitchen';
            const items = cats[catKey]?.items || {};
            Object.keys(items).forEach(itemKey => {
              const it = items[itemKey] || {};
              const cnt = Number(it.counter || 0);
              const price = Number(it.price || 0);
              typeMap[sec] = (typeMap[sec] || 0) + cnt;
              revMap[sec] = (revMap[sec] || 0) + price * cnt;
            });
          });
        }
        // Fallback to Order_List when categories aggregate not present
        const orders = this.getOrdersForKey(day, k);
        if (orders.length) {
          orders.forEach(o => {
            const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
            Object.keys(its).forEach(itemKey => {
              const it = its[itemKey] || {};
              const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
              const catKey = this.itemCatMap[itemKey] ?? this.getCategoryKeyByItemName(it?.name || '');
              const sec = (this.categories?.[catKey]?.section) || 'kitchen';
              const price = Number(it.unitPrice ?? it.price ?? 0);
              typeMap[sec] = (typeMap[sec] || 0) + cnt;
              revMap[sec] = (revMap[sec] || 0) + price * cnt;
            });
          });
        }
      });
    });
    if (type && type !== 'all') {
      const lbl = this.isArabic ? this.typeLabelAr(type) : this.typeLabelEn(type);
      const colors = [this.colorForLabel(lbl)];
      const revenueByLabel: Record<string, number> = { [lbl]: revMap[type] || 0 };
      return { labels: [lbl], values: [typeMap[type] || 0], colors, revenueByLabel } as any;
    }
    const labels = allTypes.map(t => this.isArabic ? this.typeLabelAr(t) : this.typeLabelEn(t));
    const values = allTypes.map(t => typeMap[t] || 0);
    const revenueByLabel: Record<string, number> = {};
    labels.forEach((lbl, idx) => { const key = allTypes[idx]; revenueByLabel[lbl] = revMap[key] || 0; });
    const colors = labels.map(lbl => this.colorForLabel(lbl));
    return { labels, values, colors, revenueByLabel } as any;
  }

  private getDiscountsDataset(scale: 'day' | 'week' | 'month' | 'year') {
    const buckets = this.bucketize(scale);
    const typeSet = new Set<string>();
    Object.keys(this.history || {}).forEach(k => {
      const d = this.history[k];
      const dis = d?.discounts || {};
      Object.keys(dis).forEach(t => typeSet.add(t));
    });
    const types = Array.from(typeSet.values());
    const labels: string[] = [];
    const sumsPerType: Record<string, number[]> = {};
    types.forEach(t => sumsPerType[t] = []);
    buckets.forEach(b => {
      labels.push(b.label);
      const totals: Record<string, number> = {};
      types.forEach(t => totals[t] = 0);
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        const dis = day?.discounts || {};
        types.forEach(t => totals[t] += Number(dis?.[t]?.value ?? dis?.[t] ?? 0) || 0);
      });
      types.forEach(t => sumsPerType[t].push(totals[t]));
    });
    const colors = ['#f97316','#22c55e','#0ea5e9','#8b5cf6','#ef4444','#06b6d4'];
    const datasets = types.map((t, i) => ({ label: this.discountLabel(t), data: sumsPerType[t], backgroundColor: colors[i % colors.length] }));
    return { labels, datasets };
  }

  private discountLabel(t: string) {
    if (!t) return this.isArabic ? 'خصم' : 'Discount';
    if (t === 'type1') return this.isArabic ? 'خصم 1' : 'Type 1';
    if (t === 'type2') return this.isArabic ? 'خصم 2' : 'Type 2';
    if (t === 'type3') return this.isArabic ? 'خصم 3' : 'Type 3';
    return t;
  }

  private typeLabelAr(t: string) {
    if (t === 'kitchen') return 'المطبخ';
    if (t === 'bar') return 'البار';
    if (t === 'hookah') return 'الأرجيلة';
    return 'أخرى';
  }
  private typeLabelEn(t: string) {
    if (t === 'kitchen') return 'Kitchen';
    if (t === 'bar') return 'Bar';
    if (t === 'hookah') return 'Hookah';
    return 'Other';
  }

  private sumDiscounts(discounts: any): number {
    let s = 0;
    Object.keys(discounts || {}).forEach(k => {
      const v = discounts[k];
      s += Number(v?.value ?? v ?? 0) || 0;
    });
    return s;
  }

  private sumCategory(day: any, catKey: string, key?: string): number {
    const cat = day?.categories?.[catKey] || {};
    const items = cat?.items || {};
    let sum = 0;
    Object.keys(items).forEach(itemKey => {
      const it = items[itemKey] || {};
      const cnt = Number(it.counter || 0);
      sum += cnt;
    });
    // Fallback to orders if categories aggregate is empty
    if (sum === 0) {
      const orders = this.getOrdersForKey(day, key);
      orders.forEach(o => {
        const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
        Object.keys(its).forEach(itemKey => {
          const it = its[itemKey] || {};
          const catFrom = this.itemCatMap[itemKey] ?? this.getCategoryKeyByItemName(it?.name || '');
          if (catFrom !== catKey) return;
          const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
          sum += cnt;
        });
      });
    }
    return sum;
  }

  private sumCategoryRevenue(day: any, catKey: string, key?: string): number {
    const cat = day?.categories?.[catKey] || {};
    const items = cat?.items || {};
    let sum = 0;
    Object.keys(items).forEach(itemKey => {
      const it = items[itemKey] || {};
      const price = Number(it.price || 0);
      const cnt = Number(it.counter || 0);
      sum += price * cnt;
    });
    if (sum === 0) {
      const orders = this.getOrdersForKey(day, key);
      orders.forEach(o => {
        const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
        Object.keys(its).forEach(itemKey => {
          const it = its[itemKey] || {};
          const catFrom = this.itemCatMap[itemKey] ?? this.getCategoryKeyByItemName(it?.name || '');
          if (catFrom !== catKey) return;
          const price = Number(it.unitPrice ?? it.price ?? 0);
          const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
          sum += price * cnt;
        });
      });
    }
    return Math.max(0, sum);
  }

  private computeDayRevenue(day: any, key?: string): number {
    let rev = 0;
    const cats = day?.categories || {};
    Object.keys(cats).forEach(catKey => {
      const items = cats[catKey]?.items || {};
      Object.keys(items).forEach(itemKey => {
        const it = items[itemKey] || {};
        const price = Number(it.price || 0);
        const cnt = Number(it.counter || 0);
        rev += price * cnt;
      });
    });
    const dis = this.sumDiscounts(day?.discounts || {});
    rev -= dis;
    if (rev <= 0) {
      // Fallback to orders if categories aggregate not present
      const orders = this.getOrdersForKey(day, key);
      let fromOrders = 0;
      orders.forEach(o => {
        const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
        Object.keys(its).forEach(itemKey => {
          const it = its[itemKey] || {};
          const price = Number(it.unitPrice ?? it.price ?? 0);
          const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
          fromOrders += price * cnt;
        });
      });
      rev = fromOrders;
    }
    return rev < 0 ? 0 : rev;
  }

  private getCategoryLabel(catKey: string): string {
    const c = this.categories?.[catKey] || {};
    return this.isArabic ? (c.nameArabic || catKey) : (c.name || catKey);
  }

  private pickColor(i: number) {
    const palette = ['#0ea5e9','#22c55e','#f97316','#8b5cf6','#ef4444','#06b6d4','#84cc16','#a855f7','#14b8a6','#eab308'];
    return palette[i % palette.length];
  }

  private colorForLabel(label: string) {
    // Expanded distinct palette (40+) with maximized hue distance and varied luminance
    const palette = [
      '#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf',
      '#003f5c','#58508d','#bc5090','#ff6361','#ffa600','#2f4b7c','#665191','#a05195','#d45087','#f95d6a',
      '#ff7c43','#4e79a7','#f28e2c','#e15759','#76b7b2','#59a14f','#edc949','#af7aa1','#ff9da7','#9c755f',
      '#86bc99','#5f9ea0','#ff6f61','#6b5b95','#88b04b','#92a8d1','#f7cac9','#955251','#b565a7','#009688',
      '#795548','#607d8b','#9e9d24','#c2185b'
    ];
    const h = this.hashString(label);
    return palette[Math.abs(h) % palette.length];
  }

  private hashString(s: string): number {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) + s.charCodeAt(i);
    return h | 0;
  }

  private bucketize(scale: 'day' | 'week' | 'month' | 'year') {
    const keys = Object.keys(this.history || {}).sort();
    if (!keys.length) return [] as { label: string; keys: string[] }[];
    const byDay = keys;
    if (scale === 'day') {
      return byDay.map(k => ({ label: k, keys: [k] }));
    }
    const parse = (k: string) => {
      const [yy, mm, dd] = (k || '').split('-').map(n => Number(n));
      return new Date(yy || 0, (mm || 1) - 1, dd || 1);
    };
    if (scale === 'week') {
      const map: Record<string, string[]> = {};
      byDay.forEach(k => {
        const d = parse(k);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dom = d.getDate();
        const wOfMonth = Math.min(4, Math.floor((dom - 1) / 7) + 1); // clamp to 1..4
        const label = `${y}-${m} W${wOfMonth}`;
        if (!map[label]) map[label] = [];
        map[label].push(k);
      });
      return Object.keys(map).sort().map(l => ({ label: l, keys: map[l].sort() }));
    }
    if (scale === 'month') {
      const map: Record<string, string[]> = {};
      byDay.forEach(k => {
        const d = parse(k);
        const label = `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}`;
        if (!map[label]) map[label] = [];
        map[label].push(k);
      });
      return Object.keys(map).sort().map(l => ({ label: l, keys: map[l].sort() }));
    }
    const map: Record<string, string[]> = {};
    byDay.forEach(k => {
      const d = parse(k);
      const label = `${d.getFullYear()}`;
      if (!map[label]) map[label] = [];
      map[label].push(k);
    });
    return Object.keys(map).sort().map(l => ({ label: l, keys: map[l].sort() }));
  }

  private getYearWeek(d: Date) {
    const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(((+date - +yearStart) / 86400000 + 1)/7);
    return { y: date.getUTCFullYear(), w: String(weekNo).padStart(2,'0') };
  }

  formatDateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  onOrdersDateChange() {
    this.observeOrdersForDate(this.selectedOrdersDate);
  }

  private observeOrdersForDate(dateKey: string) {
    if (this.ordersUnsub) { this.ordersUnsub(); this.ordersUnsub = null; }
    this.ordersByKey = {};
    // Compute local day window and the UTC date keys that may hold these orders
    const [y, m, d] = dateKey.split('-').map(n => Number(n));
    const start = new Date(y, (m || 1) - 1, d || 1, 0, 0, 0, 0).getTime();
    const end = new Date(y, (m || 1) - 1, d || 1, 23, 59, 59, 999).getTime();
    const keyStart = new Date(start).toISOString().split('T')[0];
    const keyEnd = new Date(end).toISOString().split('T')[0];
    const keys = Array.from(new Set([keyStart, keyEnd]));
    const unsubs: (() => void)[] = [];
    const update = () => {
      const merged: Record<string, any> = {};
      keys.forEach(k => {
        const arr = this.ordersByKey[k] || [];
        arr.forEach(o => { merged[o.id] = o; });
      });
      this.orders = Object.values(merged).sort((a: any, b: any) => {
        const ca = Number((a as any).createdAt ?? 0) || 0;
        const cb = Number((b as any).createdAt ?? 0) || 0;
        if (cb !== ca) return cb - ca;
        return Number(b.id) - Number(a.id);
      });
    };
    keys.forEach(k => {
      const r = ref(db, `restaurants/${this.restaurantId}/history/${k}/Order_List`);
      const u = onValue(r, snap => {
        const data = snap.exists() ? snap.val() : {};
        const arr = Object.keys(data).map(id => ({ id, ...(data[id] || {}) }));
        const filtered = arr.filter(o => {
          const ts = Number((o as any).createdAt ?? 0) || 0;
          if (!ts) return false;
          return ts >= start && ts <= end;
        });
        this.ordersByKey[k] = filtered;
        update();
      });
      unsubs.push(u);
    });
    this.ordersUnsub = () => unsubs.forEach(fn => { try { fn(); } catch {} });
  }

  private localKeyToIsoDateKey(localKey: string): string {
    const [y, m, d] = localKey.split('-').map(n => Number(n));
    const dt = new Date(y, (m || 1) - 1, d || 1);
    return dt.toISOString().split('T')[0];
  }

  get filteredOrders() {
    const q = (this.orderSearch || '').trim().toLowerCase();
    let arr = this.orders;
    if (q) arr = arr.filter(o => String(o.id).toLowerCase().includes(q));
    return arr.slice(0, this.orderPageSize);
  }

  loadMoreOrders() {
    this.orderPageSize += 10;
  }

  onMatDateChange(e: MatDatepickerInputEvent<Date>) {
    const d = e.value || new Date();
    this.ordersDate = d;
    this.selectedOrdersDate = this.formatDateKey(d);
    this.onOrdersDateChange();
  }

  toggleExpand(id: string) {
    this.expandedOrders[id] = !this.expandedOrders[id];
  }

  isExpanded(id: string): boolean {
    return !!this.expandedOrders[id];
  }

  orderItemsArray(o: any): any[] {
    const src = (o?.items ?? o?.orders ?? {});
    if (Array.isArray(src)) return src;
    return Object.keys(src || {}).map(k => ({ key: k, ...(src[k] || {}) }));
  }

  getItemDisplayName(item: any) {
    const en = String(item?.name || '');
    const ar = String(item?.name || '');
    return this.isArabic ? (item?.nameArabic || en) : (en || item?.nameArabic);
  }

  getTopSelling(limit = 8): { label: string; count: number }[] {
    const buckets = this.bucketize(this.timeScale);
    const countsByKey: Record<string, number> = {};
    const add = (key: string, qty: number) => { countsByKey[key] = (countsByKey[key] || 0) + qty; };
    buckets.forEach(b => {
      b.keys.forEach(k => {
        const day = this.history[k];
        if (!day) return;
        const cats = day?.categories || {};
        Object.keys(cats).forEach(catKey => {
          const items = cats[catKey]?.items || {};
          Object.keys(items).forEach(itKey => {
            const it = items[itKey] || {};
            const cnt = Number(it.counter || 0);
            add(itKey, cnt);
          });
        });
        // Fallback to live orders and Order_List
        const orders = this.getOrdersForKey(day, k);
        orders.forEach(o => {
          const its = (o?.items ?? o?.orders ?? {}) as Record<string, any>;
          Object.keys(its).forEach(itKey => {
            const it = its[itKey] || {};
            const cnt = Number(it.quantity ?? it.counter ?? 0) || 0;
            const norm = this.normalizeName(it?.name || it?.nameArabic || itKey);
            add(norm, cnt);
          });
        });
      });
    });
    // Map keys to selected-language labels and merge
    const byLabel: Record<string, number> = {};
    Object.keys(countsByKey).forEach(key => {
      let label: string;
      if (this.idToItem[key]) {
        const it = this.idToItem[key];
        label = this.isArabic ? (it.nameArabic || it.name || key) : (it.name || it.nameArabic || key);
      } else if (this.nameToItem[key]) {
        const it = this.nameToItem[key];
        label = this.isArabic ? (it.nameArabic || it.name || key) : (it.name || it.nameArabic || key);
      } else {
        label = key;
      }
      byLabel[label] = (byLabel[label] || 0) + (countsByKey[key] || 0);
    });
    const arr = Object.keys(byLabel).map(label => ({ label, count: byLabel[label] }));
    arr.sort((a,b) => b.count - a.count);
    return arr.slice(0, limit);
  }

  getRestaurantDisplayName(): string {
    return this.restaurantName || this.restaurantId;
  }

  // trackBy helpers to keep DOM stable and avoid freezes
  trackById(_i: number, item: any) { return item?.id ?? item?.key ?? _i; }
  trackByKey(_i: number, item: any) { return item?.key ?? _i; }
}
