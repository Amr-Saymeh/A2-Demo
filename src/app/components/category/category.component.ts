import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { firebaseService } from '../../services/restaurant.service';

import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { TableSessionService, TableSession } from '../../services/table-session.service';
import { db } from '../../firebase';
import { ref, push, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `

    <div class="category-container">
      <div class="container py-5">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold">{{ isArabic ? nameArabic : name }}</h2>
          <div class="divider mx-auto"></div>
          <p class="lead text-muted">
            {{ isArabic ? catArabicPhrase : catPhrase }}
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-4" *ngFor="let product of items">
            <div class="product-card" (click)="openModal(product)">
              <div class="product-image">
                <img [src]="product.image" [alt]="isArabic ? product.nameArabic : product.name">
              </div>
              <div class="product-details">
                <div class="item-wrap">
                <h4 class="product-title">{{ isArabic ? product.nameArabic : product.name }}</h4>
                <div class="price-tag">{{ product.price }}₪</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Item Modal -->
      <div class="item-modal-overlay" *ngIf="showModal" [dir]="isArabic ? 'rtl' : 'ltr'" (click)="closeModal()">
        <div class="item-modal" (click)="$event.stopPropagation()">
          <div class="modal-image">
            <img *ngIf="selectedItem" [src]="selectedItem.image" [alt]="isArabic ? selectedItem.nameArabic : selectedItem.name" />
          </div>

            <div class="modal-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h3 class="mb-0">{{ isArabic ? selectedItem?.nameArabic : selectedItem?.name }}</h3>
                <div class="price-chip">{{ selectedItem?.price }}₪</div>
              </div>

              <div class="ingredients mb-3">
                <h6 class="mb-2">{{ isArabic ? 'المكونات:' : 'Ingredients:' }}</h6>
                <div>
                  <ul>
                    <li *ngFor="let i of (isArabic ? selectedItem?.ingredientsArabic : selectedItem?.ingredients)">
                      {{ i }}
                    </li>
                  </ul>
                </div>
              </div>

            <!-- Notes & Quantity shown only when signed in -->
            <div *ngIf="signedIn && session; else signInNotice">
              <!-- Choices Section: only if item has choices -->
              <div *ngIf="hasChoices" class="mb-3">
                <h6 class="mb-2">{{ isArabic ? 'اختر خياراً:' : 'Select a choice:' }}</h6>
                <div class="choice-group">
                  <span class="choice-chip" *ngFor="let c of choiceDisplay; let i = index"
                        [class.active]="selectedChoiceIndex === i"
                        (click)="selectChoice(i); $event.stopPropagation()">
                    {{ c.label }}<span class="choice-add" *ngIf="c.add"> +₪{{ c.add }}</span>
                  </span>
                </div>
              </div>

              <div class="d-flex align-items-center justify-content-between mb-4">
                <div class="qty-ctrl">
                  <button type="button" class="round minus" (click)="decQty()" [disabled]="quantity <= 1">−</button>
                  <input class="qty-input" type="number" [value]="quantity" min="1" (change)="setQtyModal(+$any($event.target).value)" />
                  <button type="button" class="round plus" (click)="incQty()">+</button>
                </div>
                <div class="total-price">
                  <small>{{ isArabic ? 'المجموع' : 'Total' }}</small>
                  <div class="h5 mb-0">{{ ((selectedItem?.price || 0) + selectedChoiceAdd) * quantity }}₪</div>
                </div>
              </div>

              <div class="mb-3">
                <button type="button" class="btn btn-sm btn-outline-secondary" (click)="showNotes = !showNotes">
                  {{ isArabic ? 'ملاحظات' : 'Notes' }} <span [innerText]="showNotes ? '▲' : '▼'"></span>
                </button>
                <div *ngIf="showNotes" class="mt-2">
                  <textarea class="form-control" rows="3" [(ngModel)]="notes" placeholder="{{ isArabic ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...' }}"></textarea>
                </div>
              </div>

              <button type="button" class="btn btn-order w-100" (click)="onPrimaryCta()" [disabled]="placingOrder || (hasChoices && selectedChoiceIndex === null)">
                <span *ngIf="!placingOrder">{{ justAdded ? (isArabic ? 'عرض السلة' : 'View in cart') : (isArabic ? 'أضف إلى السلة' : 'Add to cart') }}</span>
                <span *ngIf="placingOrder" class="spinner-border spinner-border-sm"></span>
              </button>
            </div>

            <ng-template #signInNotice>
              <div class="alert alert-warning mt-3" role="alert">
                {{ isArabic ? 'الرجاء تسجيل الدخول عبر رابط الطاولة لطلب هذا الطبق.' : 'Please sign in via your table link to order this item.' }}
              </div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Cart FAB bottom-right (outside modal) -->
      <a *ngIf="signedIn" class="cart-fab-right" [routerLink]="['/cart']" [attr.aria-label]="isArabic ? 'السلة' : 'Cart'">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M7 18c-.83 0-1.5.67-1.5 1.5S6.17 21 7 21s1.5-.67 1.5-1.5S7.83 18 7 18zm10 0c-.83 0-1.5.67-1.5 1.5S16.17 21 17 21s1.5-.67 1.5-1.5S17.83 18 17 18zM7.16 14.26h9.97c.68 0 1.28-.43 1.49-1.08l2.07-6.21A1.25 1.25 0 0 0 19.52 5H6.21L5.7 3.65A1.5 1.5 0 0 0 4.21 2.63H3a1 1 0 1 0 0 2h1.21l3.18 8.44-.73 1.88a1.5 1.5 0 0 0 1.5 2.06h10.59a1 1 0 1 0 0-2H8.16l.53-1.35z"/>
        </svg>
      </a>

    </div>

  `,
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isArabic = false;

  // Category data
  name: string = '';
  nameArabic: string = '';
  catPhrase: string = '';
  catArabicPhrase: string = '';
  icon: string = '';
  items: Product[] = [];

  // Restaurant context
  private restId: string | null = null;

  // Table session state
  signedIn = false;
  session: TableSession | null = null;

  // Modal state
  showModal = false;
  selectedItem: Product | null = null;
  quantity = 1;
  notes = '';
  placingOrder = false;
  showNotes = false;
  justAdded = false;
  // Choice selection state
  selectedChoiceIndex: number | null = null;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private tableSession: TableSessionService,
    private router: Router,
  ) {}

  async ngOnInit() {
    // Language
    this.languageService.isArabic$.subscribe((lang: boolean) => (this.isArabic = lang));
    this.isArabic = this.languageService.getCurrentLanguage();

    // React to route changes and fetch only the selected category (cache first, then remote respecting meta)
    this.route.paramMap.subscribe(async (params) => {
      const categoryKey = params.get('categoryKey');
      const restIdParam = params.get('restId');
      if (restIdParam) this.restId = restIdParam;
      if (!categoryKey) return;
      const restId = this.restId || '';
      if (!restId) return;

      // 1) Immediate cache render if available
      const cached = firebaseService.getCategoryFromCache(restId, categoryKey);
      if (cached) {
        this.name = cached.name || '';
        this.nameArabic = cached.nameArabic || '';
        this.catPhrase = cached.catPhrase || '';
        this.catArabicPhrase = cached.catArabicPhrase || '';
        this.icon = cached.icon || 'fas fa-utensils';
        this.items = cached.items ? (Object.values(cached.items) as Product[]) : [];
      } else {
        this.name = '';
        this.nameArabic = '';
        this.catPhrase = '';
        this.catArabicPhrase = '';
        this.icon = 'fas fa-utensils';
        this.items = [];
      }

      // 2) Always fetch remote via meta-aware service to reflect latest changes
      try {
        const fresh = await firebaseService.getCategory(restId, categoryKey);
        if (fresh) {
          this.name = fresh.name || '';
          this.nameArabic = fresh.nameArabic || '';
          this.catPhrase = fresh.catPhrase || '';
          this.catArabicPhrase = fresh.catArabicPhrase || '';
          this.icon = fresh.icon || 'fas fa-utensils';
          this.items = fresh.items ? (Object.values(fresh.items) as Product[]) : [];
        }
      } catch (_) {
        // ignore fetch error; cache already rendered
      }
    });

    // Subscribe to table session
    this.tableSession.signedIn$.subscribe((s: boolean) => (this.signedIn = s));
    this.tableSession.session$.subscribe((sess: TableSession | null) => {
      this.session = sess;
      if (sess?.restId) {
        this.restId = sess.restId;
      }
    });
  }

  openModal(item: Product) {
    this.selectedItem = item;
    this.quantity = 1;
    this.notes = '';
    this.showModal = true;
    this.showNotes = false;
    this.justAdded = false;
    // Default select first choice if available
    this.selectedChoiceIndex = this.hasChoices ? 0 : null;
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
    this.placingOrder = false;
  }

  decQty() {
    if (this.quantity > 1) this.quantity--;
  }

  incQty() {
    this.quantity++;
  }

  setQtyModal(next: number) {
    const v = Math.max(1, Number(next) || 1);
    this.quantity = v;
  }

  // Computed helpers for choices (structured + legacy)
  get structuredOptions(): { en: string; ar: string; add: number }[] | null {
    const opts = (this.selectedItem as any)?.choiceOptions;
    return Array.isArray(opts) ? opts.filter((o: any) => o && (o.en || o.ar)) : null;
  }
  // Legacy for compatibility
  get currentChoices(): string[] {
    const arr = this.isArabic ? (this.selectedItem?.choicesArabic as any) : (this.selectedItem?.choices as any);
    return Array.isArray(arr) ? arr.filter((x: any) => !!x) : [];
  }
  get choiceDisplay(): { label: string; add: number }[] {
    const opts = this.structuredOptions;
    if (opts && opts.length) {
      return opts.map((o) => ({ label: this.isArabic ? (o.ar || o.en || '') : (o.en || o.ar || ''), add: Number(o.add) || 0 }));
    }
    // legacy fallback labels only
    return this.currentChoices.map((c) => ({ label: c, add: 0 }));
  }
  get selectedChoiceAdd(): number {
    const opts = this.structuredOptions;
    if (opts && opts.length && this.selectedChoiceIndex != null && opts[this.selectedChoiceIndex]) {
      return Number(opts[this.selectedChoiceIndex].add) || 0;
    }
    return 0;
  }
  get hasChoices(): boolean { return this.choiceDisplay.length > 0; }
  selectChoice(i: number) { this.selectedChoiceIndex = i; }

  onPrimaryCta() {
    if (this.justAdded) { this.router.navigate(['/cart']); return; }
    this.placeOrder();
  }

  async placeOrder() {
    if (!this.signedIn || !this.session || !this.restId || !this.selectedItem) {
      return;
    }
    // If item has choices (structured or legacy), enforce selection
    const choicesEn = Array.isArray(this.selectedItem.choices) ? this.selectedItem.choices : [];
    const choicesAr = Array.isArray(this.selectedItem.choicesArabic) ? this.selectedItem.choicesArabic : [];
    const opts = Array.isArray((this.selectedItem as any).choiceOptions) ? (this.selectedItem as any).choiceOptions as { en: string; ar: string; add: number }[] : [];
    const usingStructured = opts.length > 0;
    const hasChoices = usingStructured ? opts.length > 0 : ((choicesEn && choicesEn.length) || (choicesAr && choicesAr.length));
    let selectedChoiceEn: string | null = null;
    let selectedChoiceAr: string | null = null;
    let choiceAdd = 0;
    if (this.selectedChoiceIndex != null) {
      if (usingStructured) {
        const o = opts[this.selectedChoiceIndex];
        if (o) { selectedChoiceEn = o.en || null; selectedChoiceAr = o.ar || null; choiceAdd = Number(o.add) || 0; }
      } else {
        selectedChoiceEn = choicesEn[this.selectedChoiceIndex] ?? null;
        selectedChoiceAr = choicesAr[this.selectedChoiceIndex] ?? null;
      }
    }
    if (hasChoices && this.selectedChoiceIndex === null) {
      return; // selection required
    }
    this.placingOrder = true;
    try {
      const orderPath = `restaurants/${this.restId}/tables/${this.session.tableId}/order`;
      const orderRef = ref(db, orderPath);

      // Merge logic: if adding same item (Arabic or English name) with empty notes, add to existing quantity for unordered items only
      const enName = this.selectedItem.name;
      const arName = this.selectedItem.nameArabic;
      const notes = this.notes?.trim() || '';

      if (notes === '') {
        const snap = await get(orderRef);
        if (snap.exists()) {
          const orders = snap.val() as any;
          let foundKey: string | null = null;
          let foundQty = 0;
          for (const [k, v] of Object.entries(orders)) {
            const ov: any = v;
            const vDetails = (ov.details ?? '').trim();
            const ovChoiceEn = ov.choiceEn ?? null;
            const ovChoiceAr = ov.choiceAr ?? null;
            const choicesEqual = (selectedChoiceEn || selectedChoiceAr)
              ? (ovChoiceEn === selectedChoiceEn && ovChoiceAr === selectedChoiceAr)
              : (!ovChoiceEn && !ovChoiceAr);
            if (vDetails === '' && (ov.name === enName || ov.name === arName) && ((ov.state ?? 'unordered') === 'unordered') && choicesEqual) {
              foundKey = k;
              foundQty = Number(ov.quantity) || 0;
              break;
            }
          }
          if (foundKey) {
            await update(ref(db, `${orderPath}/${foundKey}`), {
              quantity: foundQty + this.quantity,
              ts: Date.now(),
            });
            this.justAdded = true;
            this.placingOrder = false;
            return;
          }
        }
      }

      // Otherwise, push a new order
      const payload: any = {
        name: this.isArabic ? arName : enName,
        details: notes,
        quantity: this.quantity,
        ts: Date.now(),
        state: 'unordered',
        unitPrice: (this.selectedItem.price || 0) + (choiceAdd || 0),
        choiceEn: selectedChoiceEn || null,
        choiceAr: selectedChoiceAr || null,
      };

      await push(orderRef, payload);
      this.justAdded = true;
      this.placingOrder = false;
    } catch (e) {
      console.error('Failed to place order:', e);
      this.placingOrder = false;
    }
  }
}