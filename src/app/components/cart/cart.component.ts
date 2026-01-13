import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, Location, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { db } from '../../firebase';
import { onValue, ref, remove, update } from 'firebase/database';
import { LanguageService } from '../../services/language.service';
import { TableSessionService, TableSession } from '../../services/table-session.service';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';

interface CartItem {
  name: string;
  quantity: number;
  details?: string;
  state?: 'unordered' | 'ordered' | 'done';
  image?: string;
  unitPrice?: number;
  ts?: number;
  choiceEn?: string | null;
  choiceAr?: string | null;
}

interface CartRow { key: string; item: CartItem; }

@Component({
  selector: 'app-cart',
  standalone: true,   
  imports: [CommonModule, FormsModule], 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  isArabic = false;
  Math = Math;
  session: TableSession | null = null;
  private unsub: (() => void) | null = null;
  private categoriesSub: Subscription | null = null;
  private categoriesCache: any = null;

  rows: CartRow[] = [];
  unordered: CartRow[] = [];
  submitted: CartRow[] = [];

  expandedNotes = new Set<string>();
  notesDrafts: Record<string, string> = {};

  showOrderModal = false;
  modalRow: CartRow | null = null;
  modalLocked = false;
  modalQty = 1;
  modalNotes = '';
  modalChoiceIndex: number | null = null;

  constructor(
    private lang: LanguageService,
    private tableSession: TableSessionService,
    private location: Location,
    private menu: MenuService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.lang.isArabic$.subscribe(v => (this.isArabic = v));
    this.tableSession.session$.subscribe(sess => {
      this.session = sess;
      this.detach();
      if (sess) {
        this.attach(sess);
        this.attachCategories(sess.restId);
      } else {
        this.detachCategories();
      }
    });
  }

  private getMenuItemPrice(name: string): number {
    const it = this.findMenuItemByName(name);
    const p = Number((it?.price as any) ?? 0);
    return isNaN(p) ? 0 : p;
  }

  private getChoiceAddByIndex(name: string, index: number | null): number {
    if (index === null || index === undefined) return 0;
    const list = this.getChoiceDisplayStructured(name);
    const item = list[index];
    return item ? Number(item.add) || 0 : 0;
  }

  getUnitPrice(row: CartRow): number {
    const state = (row.item.state ?? 'unordered');
    const stored = Number(row.item.unitPrice ?? NaN);
    if (state !== 'unordered' && !isNaN(stored)) return stored;
    const base = this.getMenuItemPrice(row.item.name || '');
    const selectedIdx = this.getSelectedChoiceIndex(row);
    const add = this.getChoiceAddByIndex(row.item.name || '', selectedIdx >= 0 ? selectedIdx : null);
    return base + add;
  }

  getItemImage(name: string): string | null {
    const it = this.findMenuItemByName(name);
    return (it?.image as any) || null;
  }

  ngOnDestroy(): void { 
    this.detach(); 
    this.detachCategories(); 
  }

  private attach(sess: TableSession) {
    if (!isPlatformBrowser(this.platformId)) return;

    const orderRef = ref(db, `restaurants/${sess.restId}/tables/${sess.tableId}/order`);
    this.unsub = onValue(orderRef, (snap) => {
      const val = (snap.val() || {}) as Record<string, CartItem>;
      const arr: CartRow[] = Object.keys(val).map(key => ({ key, item: val[key] || ({} as CartItem) }));
      arr.sort((a, b) => (a.item.ts || 0) - (b.item.ts || 0) || (a.item.name || '').localeCompare(b.item.name || ''));
      this.rows = arr;
      this.unordered = arr.filter(r => (r.item.state ?? 'unordered') === 'unordered');
      this.submitted = arr.filter(r => (r.item.state ?? 'unordered') !== 'unordered');

      const nextDrafts: Record<string, string> = {};
      for (const r of arr) {
        const key = r.key;
        nextDrafts[key] = this.expandedNotes.has(key)
          ? (this.notesDrafts[key] ?? (r.item.details || ''))
          : (r.item.details || '');
      }
      this.notesDrafts = nextDrafts;
    });
  }

  private detach() {
    if (this.unsub) { this.unsub(); this.unsub = null; }
    this.rows = []; this.unordered = []; this.submitted = []; this.expandedNotes.clear();
  }

  private attachCategories(restId: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.detachCategories();
    this.categoriesSub = this.menu.getCategories(restId).subscribe(categories => {
      this.categoriesCache = categories;
    });
  }

  private detachCategories() {
    if (this.categoriesSub) { this.categoriesSub.unsubscribe(); this.categoriesSub = null; }
    this.categoriesCache = null;
  }

  goBack() { this.location.back(); }

  get subtotal(): number {
    return this.rows.reduce((acc, r) => acc + (this.getUnitPrice(r) * Number(r.item.quantity || 0)), 0);
  }

  private findMenuItemByName(name: string): any | null {
    const categories = this.categoriesCache;
    if (!categories || !name) return null;
    const lower = name.toLocaleLowerCase();
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
    const opts = Array.isArray((it as any)?.choiceOptions) ? ((it as any).choiceOptions as any[]) : null;
    if (opts && opts.length) {
      return opts.map(o => ({
        label: this.isArabic ? (String(o.ar || o.en || '')) : (String(o.en || o.ar || '')),
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

  getSelectedChoiceIndex(row: CartRow): number {
    const name = row.item.name || '';
    const { en, ar } = this.getChoicePairs(name);
    const targetEn = row.item.choiceEn || null;
    const targetAr = row.item.choiceAr || null;
    const idxEn = targetEn ? en.findIndex(x => x === targetEn) : -1;
    if (idxEn >= 0) return idxEn;
    const idxAr = targetAr ? ar.findIndex(x => x === targetAr) : -1;
    if (idxAr >= 0) return idxAr;

    const opts = this.getChoiceDisplayStructured(name);
    if (targetEn) {
      const i = opts.findIndex(o => (this.isArabic ? false : o.label === targetEn) || (!this.isArabic && o.label === targetEn));
      if (i >= 0) return i;
    }
    if (targetAr) {
      const i = opts.findIndex(o => (this.isArabic ? o.label === targetAr : false) || (this.isArabic && o.label === targetAr));
      if (i >= 0) return i;
    }
    return -1;
  }

  hasChoicesForOrder(row: CartRow): boolean {
    const name = row.item.name || '';
    const { en, ar } = this.getChoicePairs(name);
    if ((en.length + ar.length) > 0) return true;
    const it = this.findMenuItemByName(name);
    const opts = Array.isArray((it as any)?.choiceOptions) ? ((it as any).choiceOptions as any[]) : [];
    return opts.length > 0;
  }

  displayChoiceLabel(row: CartRow): string | null {
    const v = this.isArabic ? (row.item.choiceAr || row.item.choiceEn) : (row.item.choiceEn || row.item.choiceAr);
    return v || null;
  }

  displaySelectedChoice(row: CartRow): { label: string; add: number } | null {
    const idx = this.getSelectedChoiceIndex(row);
    if (idx < 0) return null;
    const list = this.getChoiceDisplayStructured(row.item.name || '');
    if (idx >= list.length) return { label: list[idx]?.label ?? '', add: 0 };
    return { label: list[idx].label, add: list[idx].add };
  }

  selectChoiceForOrder(row: CartRow, index: number) {
    if (!isPlatformBrowser(this.platformId) || !this.session) return;

    const name = row.item.name || '';
    const { en, ar } = this.getChoicePairs(name);
    const choiceEn = en[index] ?? null;
    const choiceAr = ar[index] ?? null;
    const base = this.getMenuItemPrice(name);
    const add = this.getChoiceAddByIndex(name, index);
    const newUnitPrice = base + add;
    const p = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${row.key}`;
    update(ref(db, p), { choiceEn, choiceAr, unitPrice: newUnitPrice });
  }

  openOrderModal(row: CartRow) {
    this.modalRow = row;
    this.modalLocked = ((row.item.state ?? 'unordered') !== 'unordered');
    this.modalQty = Number(row.item.quantity || 1);
    this.modalNotes = row.item.details || '';
    const idx = this.getSelectedChoiceIndex(row);
    this.modalChoiceIndex = (idx >= 0 ? idx : null);
    this.showOrderModal = true;
  }

  closeOrderModal() {
    this.showOrderModal = false;
    this.modalRow = null;
    this.modalChoiceIndex = null;
  }

  get modalChoices(): string[] {
    return this.getChoiceDisplayList(this.modalRow?.item.name || '');
  }

  get modalUnitPrice(): number {
    if (!this.modalRow) return 0;
    const name = this.modalRow.item.name || '';
    const base = this.getMenuItemPrice(name);
    const idx = this.modalChoiceIndex !== null ? this.modalChoiceIndex : this.getSelectedChoiceIndex(this.modalRow);
    const add = this.getChoiceAddByIndex(name, idx);
    return base + add;
  }

  selectChoiceInModal(i: number) { if (!this.modalLocked) this.modalChoiceIndex = i; }

  async saveOrderModal() {
    if (!isPlatformBrowser(this.platformId) || !this.session || !this.modalRow || this.modalLocked) return;

    const base = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${this.modalRow.key}`;
    const patch: any = { quantity: Math.max(1, Number(this.modalQty) || 1), details: this.modalNotes || '' };
    if (this.modalChoiceIndex !== null) {
      const name = this.modalRow.item.name || '';
      const { en, ar } = this.getChoicePairs(name);
      patch.choiceEn = en[this.modalChoiceIndex] ?? null;
      patch.choiceAr = ar[this.modalChoiceIndex] ?? null;
      const basePrice = this.getMenuItemPrice(name);
      const add = this.getChoiceAddByIndex(name, this.modalChoiceIndex);
      patch.unitPrice = basePrice + add;
    }
    await update(ref(db, base), patch);
    this.closeOrderModal();
  }

  toggleNotes(key: string) {
    if (this.expandedNotes.has(key)) this.expandedNotes.delete(key);
    else {
      this.expandedNotes.add(key);
      const r = this.rows.find(x => x.key === key);
      if (r && this.notesDrafts[key] === undefined) this.notesDrafts[key] = r.item.details || '';
    }
  }

  async setQty(key: string, qty: number) {
    if (!isPlatformBrowser(this.platformId) || !this.session) return;

    const row = this.rows.find(r => r.key === key);
    if (row && (row.item.state ?? 'unordered') !== 'unordered') return;
    if (qty < 1) qty = 1;
    const p = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${key}`;
    await update(ref(db, p), { quantity: qty });
  }

  inc(key: string, current: number, locked: boolean) {
    if (locked) return;
    this.setQty(key, (current || 0) + 1);
  }

  dec(key: string, current: number, locked: boolean) {
    if (locked) return;
    this.setQty(key, Math.max(1, (current || 1) - 1));
  }

  async onNotesInput(key: string, value: string, locked: boolean) {
    if (!isPlatformBrowser(this.platformId) || locked || !this.session) return;
    const p = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${key}`;
    await update(ref(db, p), { details: value || '' });
  }

  async saveNotes(key: string, value: string, locked: boolean) {
    if (!isPlatformBrowser(this.platformId) || locked || !this.session) return;
    const p = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${key}`;
    await update(ref(db, p), { details: value || '' });
  }

  trackByKey(index: number, row: CartRow) { return row.key; }

  async remove(key: string, locked: boolean) {
    if (!isPlatformBrowser(this.platformId) || locked || !this.session) return;
    const p = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order/${key}`;
    await remove(ref(db, p));
  }

  async confirmOrder() {
    if (!isPlatformBrowser(this.platformId) || !this.session || this.unordered.length === 0) return;
    const base = `restaurants/${this.session.restId}/tables/${this.session.tableId}/order`;
    for (const r of this.unordered) {
      await update(ref(db, `${base}/${r.key}`), { state: 'ordered'});
    }
  }

  private resolveNameFromMenu(input: string, isArabic: boolean): string | null {
    const categories = this.categoriesCache;
    if (!categories || !input) return null;
    const lower = input.toLocaleLowerCase();
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
    if (!found) return null;
    return isArabic ? (found.nameArabic || found.name || null) : (found.name || found.nameArabic || null);
  }

  displayName(storedName: string): string {
    const resolved = this.resolveNameFromMenu(storedName || '', this.isArabic);
    return resolved || storedName;
  }
}
