import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TableSessionService, TableSession } from './services/table-session.service';
import { db } from './firebase';
import { ref, update } from 'firebase/database';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    @if (!isAdminRoute) {
    <nav class="navbar navbar-expand-lg sticky-top px-4" [ngClass]="{'navbar-dark': !isLightTheme, 'navbar-light bg-light': isLightTheme, 'signed-in': (signedIn && session), 'arabic-font': isArabic}">
      <div class="container">
        <!-- Left (mobile, signed-in): Call a waiter -->
        @if (signedIn && session) {
          <div class="nav-left d-lg-none">
            <button (click)="callWaiter()" class="btn btn-sm btn-waiter" style="padding: 0.5rem;" [disabled]="waiterRequested">
              {{ isArabic ? (waiterRequested ? 'تم الطلب' : 'اطلب النادل') : (waiterRequested ? 'Requested' : 'Call a waiter') }}
            </button>
          </div>
        }
        <a class="navbar-brand" [routerLink]="['/', currentRestId]">{{ isArabic ? 'طلة يافا' : 'Talat Yafa' }}</a>
    
    
    
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            @for (category of categories; track category) {
              <li class="nav-item">
                <a class="nav-link d-flex flex-column align-items-center"
                  [routerLink]="['/', currentRestId, 'category', category.key]"
                  routerLinkActive="active">
                  <i [class]="category.icon + ' category-icon'"></i>
                  <span>{{ isArabic ? category.nameArabic : category.name }}</span>
                </a>
              </li>
            }
          </ul>
        </div>
    
        <!-- Actions: Language (right) -->
        <div class="nav-actions ms-auto d-flex align-items-center gap-2">
          <button (click)="toggleLanguage()" class="btn btn-sm" [ngClass]="{'btn-outline-light': !isLightTheme, 'btn-outline-dark': isLightTheme}">
            {{ isArabic ? 'English' : 'عربي' }}
          </button>
        </div>
      </div>
    </nav>
    }

    @if (isAdminRoute) {
      <aside class="admin-sidebar" [attr.dir]="isArabic ? 'rtl' : 'ltr'" [ngClass]="{'arabic-font': isArabic}">
        <div class="sidebar-header d-flex align-items-center justify-content-between">
          <a class="sidebar-brand" [routerLink]="['/', currentRestId]">{{ isArabic ? 'طلة يافا' : 'Talat Yafa' }}</a>
          <button (click)="toggleLanguage()" class="btn btn-sm btn-outline-secondary">{{ isArabic ? 'English' : 'عربي' }}</button>
        </div>
        <div class="sidebar-section">
          <div class="section-title">{{ isArabic ? 'عام' : 'GENERAL' }}</div>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'dashboard']" routerLinkActive="active"><i class="fas fa-table me-2"></i>{{ isArabic ? 'لوحة التحكم' : 'Dashboard' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'stats']" routerLinkActive="active"><i class="fas fa-chart-line me-2"></i>{{ isArabic ? 'الإحصائيات' : 'Stats' }}</a>
        </div>
        <div class="sidebar-section">
          <div class="section-title">{{ isArabic ? 'الأدوات' : 'TOOLS' }}</div>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'ManageMenuComponent']" routerLinkActive="active"><i class="fas fa-utensils me-2"></i>{{ isArabic ? 'إدارة القائمة' : 'Manage Menu' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'EditItemComponent']" routerLinkActive="active"><i class="fas fa-pen me-2"></i>{{ isArabic ? 'تعديل عنصر' : 'Edit Item' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'kitchen-orders']" routerLinkActive="active"><i class="fas fa-concierge-bell me-2"></i>{{ isArabic ? 'طلبات المطبخ' : 'Kitchen Orders' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'bar-orders']" routerLinkActive="active"><i class="fas fa-glass-martini-alt me-2"></i>{{ isArabic ? 'طلبات البار' : 'Bar Orders' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'hookah-orders']" routerLinkActive="active"><i class="fas fa-smoking me-2"></i>{{ isArabic ? 'طلبات الأرجيلة' : 'Hookah Orders' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'ordering-dashboard']" routerLinkActive="active"><i class="fas fa-clipboard-list me-2"></i>{{ isArabic ? 'لوحة الطلبات' : 'Ordering Dashboard' }}</a>
        </div>
        <div class="sidebar-section">
          <div class="section-title">{{ isArabic ? 'الدعم' : 'SUPPORT' }}</div>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'attendance']" routerLinkActive="active"><i class="fas fa-user-check me-2"></i>{{ isArabic ? 'الحضور' : 'Attendance' }}</a>
          <a class="sidebar-link" [routerLink]="['/', currentRestId, 'add-employee']" routerLinkActive="active"><i class="fas fa-user-plus me-2"></i>{{ isArabic ? 'إضافة موظف' : 'Add Employee' }}</a>
        </div>
      </aside>
    }
    
    <!-- Category Navigation for Mobile -->
    @if (!isAdminRoute) {
    <div class="category-nav-mobile" [dir]="isArabic ? 'rtl' : 'ltr'">
      <div class="container">
        <div class="scrollable-nav">
          @for (category of categories; track category) {
            <a
              [routerLink]="['/', currentRestId, 'category', category.key]"
              routerLinkActive="active"
              class="category-item">
              <i [class]="category.icon"></i>
              <span>{{ isArabic ? category.nameArabic : category.name }}</span>
            </a>
          }
        </div>
      </div>
    </div>
    }
    
    <main [dir]="isArabic ? 'rtl' : 'ltr'" [ngClass]="{'arabic-font': isArabic, 'admin-content': isAdminRoute}">
      <router-outlet></router-outlet>
    </main>
    
    `,
  styles: [`
    :root {
      /* inherit global theme variables from styles.css */
    }

    /* Navbar Styles */
    .navbar {
      padding-left:0.2rem !important;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
      background-color: var(--secondary-color);
    }
    
    .navbar-brand {
      font-weight: bold;
      font-size: 1.5rem;
    }
    
    .nav-link {
      font-size: 0.9rem;
      margin: 0 0.5rem;
      transition: all 0.3s ease;
      text-align: center;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
    }
    
    .nav-link:hover {
      color: var(--primary-color) !important;
      transform: translateY(-2px);
    }
    
    .nav-link.active {
      color: var(--primary-color) !important;
      font-weight: bold;
      background-color: rgba(var(--primary-color-rgb), 0.1);
    }
    
    .category-icon {
      font-size: 1.5rem;
      margin-bottom: 0.25rem;
      display: block;
    }
    /* Custom bounce animation with 4s pause */
.category-icon.fa-bounce {
  animation: custom-bounce 5s cubic-bezier(.28,.84,.42,1) infinite;
}
@keyframes custom-bounce {
  0%   { transform: translateY(0);}
  10%  { transform: translateY(-8px);}
  20%  { transform: translateY(0);}
  100% { transform: translateY(0);}
}

/* Custom flip animation with 4s pause */
.category-icon.fa-flip {
  animation: custom-flip 5s linear infinite;
}
@keyframes custom-flip {
  0%   { transform: rotateY(0);}
  20%  { transform: rotateY(180deg);}
  40%  { transform: rotateY(0);}
  100% { transform: rotateY(0);}
}

/* Custom shake animation with 4s pause */
.category-icon.fa-shake {
  animation: custom-shake 5s linear infinite;
}
@keyframes custom-shake {
  0%, 100% { transform: translateX(0);}
  5%  { transform: translateX(-5px);}
  10% { transform: translateX(5px);}
  15% { transform: translateX(-5px);}
  20% { transform: translateX(5px);}
  25% { transform: translateX(0);}
  100% { transform: translateX(0);}
}

/* Custom beat animation with 4s pause */
.category-icon.fa-beat {
  animation: custom-beat 5s linear infinite;
}
@keyframes custom-beat {
  0%,100% { transform: scale(1);}
  10% { transform: scale(1.2);}
  20%,99% { transform: scale(1);}
}

/* Custom spin animation with 4s pause */
.category-icon.fa-spin {
  animation: custom-spin 5s linear infinite;
}
@keyframes custom-spin {
  0%   { transform: rotate(0);}
  20%  { transform: rotate(360deg);}
  100% { transform: rotate(360deg);}
}

/* Custom beat-fade animation with 4s pause */
.category-icon.fa-beat-fade {
  animation: custom-beat-fade 5s linear infinite;
}
@keyframes custom-beat-fade {
  0%,100% { opacity: 1; transform: scale(1);}
  10% { opacity: 0.7; transform: scale(1.2);}
  20%,99% { opacity: 1; transform: scale(1);}
}

/* Custom pulse animation with 4s pause */
.category-icon.fa-pulse {
  animation: custom-pulse 5s linear infinite;
}
@keyframes custom-pulse {
  0%,100% { transform: scale(1);}
  10% { transform: scale(1.1);}
  20%,99% { transform: scale(1);}
}

/* Custom fade animation with 4s pause */
.category-icon.fa-fade {
  animation: custom-fade 5s linear infinite;
}
@keyframes custom-fade {
  0%,100% { opacity: 1;}
  10% { opacity: 0.5;}
  20%,99% { opacity: 1;}
}
    /* Mobile Category Navigation */
    .category-nav-mobile {
      display: none;
      background-color: white;
      padding: 10px 0;
      position: sticky;
      top: 56px;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .scrollable-nav {
      display: flex;
      overflow-x: auto;
      padding: 5px 0;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; /* Firefox */
    }
    
    .scrollable-nav::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
    
    .category-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px 15px;
      min-width: 80px;
      text-decoration: none;
      color: var(--text-color);
      font-size: 0.8rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .category-item i {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    
    .category-item.active {
      background-color: rgba(var(--primary-color-rgb, 233, 78, 27), 0.1);
      color: var(--primary-color);
      font-weight: bold;
    }
    
    .category-item:hover {
      transform: translateY(-2px);
      color: var(--primary-color);
    }
    
    /* Nav actions */
    .nav-actions { z-index: 1050; position: relative; }
    .btn-waiter {
      background: var(--primary-color, #e94e1b);
      border-color: var(--primary-color, #e94e1b);
      color: #fff;
      box-shadow: 0 6px 14px rgba(var(--primary-color-rgb, 233, 78, 27), 0.35);
    }

    main {
      min-height: calc(100vh - 160px);
      padding-bottom: 20px;
    }


    /* Admin Sidebar */
    .admin-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 260px;
      height: 100vh;
      background: #ffffff;
      border-right: 1px solid #eee;
      padding: 16px;
      overflow-y: auto;
      z-index: 1040;
    }
    .sidebar-header { padding-bottom: 12px; border-bottom: 1px solid #f0f0f0; margin-bottom: 12px; }
    .sidebar-brand { font-weight: 700; color: var(--secondary-color); text-decoration: none; }
    .section-title { font-size: 0.75rem; letter-spacing: .08em; color: #9ca3af; padding: 12px 0 6px; }
    .sidebar-link { display: flex; align-items: center; gap: 8px; padding: 10px 12px; color: #111827; text-decoration: none; border-radius: 8px; }
    .sidebar-section .sidebar-link + .sidebar-link { border-top: 1px solid #eee; }
    .sidebar-link:hover { background: #f3f4f6; }
    .sidebar-link.active { background: #f3f4f6; font-weight: 600; }
    .sidebar-section + .sidebar-section { border-top: 1px solid #f0f0f0; margin-top: 12px; padding-top: 12px; }
    .admin-content { margin-left: 260px; }
    /* Keep sidebar fixed and scrollable on smaller screens */
    @media (max-width: 991.98px) {
      .admin-content { margin-left: 260px; }
      .admin-sidebar { position: fixed; width: 260px; height: 100vh; overflow-y: auto; top: 0; left: 0; border-right: 1px solid #eee; }
    }

    /* Desktop navbar: horizontal scroll for categories */
    .navbar .navbar-nav { flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .navbar .nav-item { flex: 0 0 auto; }
    .navbar .navbar-nav::-webkit-scrollbar { height: 6px; }
    .navbar .navbar-nav::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }



    /* RTL Support */
    [dir="rtl"] .ms-auto {
      margin-right: auto !important;
      margin-left: 0 !important;
    }

    /* Arabic Font Support */
    .arabic-font {
      font-family: 'Tajawal', 'Poppins', sans-serif;
    }



    @media (min-width: 992px) {
      main {
        padding-bottom: 0; /* No padding needed on desktop */
      }
      .category-nav-mobile {
        display: none;
      }
    }
    
    @media (max-width: 991.98px) {
      .category-nav-mobile {
        display: block;
      }
      .navbar-nav {
        display: none;
      }
      main {
        padding-top: 10px;
      }
      /* Signed-in mobile layout: left (waiter), center (brand), right (language) */
      .navbar.signed-in .container {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 8px;
      }
      .navbar.signed-in .nav-left { grid-column: 1; justify-self: start; }
      .navbar.signed-in .navbar-brand { grid-column: 2; justify-self: center; }
      .navbar.signed-in .nav-actions { grid-column: 3; justify-self: end; }
    }
  `]
})
export class AppComponent implements OnInit {
  isArabic = false;
  isLightTheme = false;
  categories: any[] = [];
  signedIn = false;
  session: TableSession | null = null;
  waiterRequested = false;
  currentRestId: string = '';
  isAdminRoute = false;
  private adminPages = new Set([
    'dashboard',
    'stats',
    'ManageMenuComponent',
    'EditItemComponent',
    'kitchen-orders',
    'bar-orders',
    'hookah-orders',
    'ordering-dashboard',
    'attendance',
    'add-employee',
    'control-board'
  ]);

  constructor(private languageService: LanguageService, private router: Router, private tableSession: TableSessionService, private route: ActivatedRoute) {}

  async ngOnInit() {
    // Subscribe to language changes
    this.languageService.isArabic$.subscribe(isArabic => {
      this.isArabic = isArabic;
    });
    this.isArabic = this.languageService.getCurrentLanguage();

    // Track table session state
    this.tableSession.signedIn$.subscribe(s => this.signedIn = s);
    this.tableSession.session$.subscribe(sess => { this.session = sess; if (sess?.restId) { this.currentRestId = sess.restId; }});

    const seg = (this.router.url.split('/')[1] || '').trim();
    if (seg && seg !== 'cart') { this.currentRestId = seg; }
    this.updateAdminRoute(this.router.url);

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const first = (this.router.url.split('/')[1] || '').trim();
      if (first && first !== 'cart') {
        this.currentRestId = first;
      }
      this.updateAdminRoute(this.router.url);
    });

    // Fetch categories for 'rest1' using vanilla Firebase service to avoid DI issues at root
    if (!this.currentRestId) {
      const seg2 = (this.router.url.split('/')[1] || '').trim();
      if (seg2 && seg2 !== 'cart') {
        this.currentRestId = seg2;
      }
    }
    const { firebaseService } = await import('./services/restaurant.service');
    const categoriesObj = await firebaseService.getCategories(this.currentRestId);
    const obj = categoriesObj || {};
    this.categories = Object.entries(obj).map(([key, value]: [string, any]) => ({
      key,
      name: (value as any)?.name || '',
      nameArabic: (value as any)?.nameArabic || '',
      icon: (value as any)?.icon || 'fas fa-utensils'
    }));
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  private updateAdminRoute(url: string) {
    const clean = (url || '').split('#')[0].split('?')[0];
    const parts = clean.split('/').filter(Boolean); // e.g., ['rest1','dashboard']
    const page = parts.length >= 2 ? parts[1] : '';
    this.isAdminRoute = this.adminPages.has(page);
  }

  async callWaiter() {
    if (!this.signedIn || !this.session) return;
    this.waiterRequested = true;
    try {
      //const tableRef = ref(db, `restaurants/${this.session.restId}/tables/${this.session.tableId}`);
      //await update(tableRef, { callWaiter: true, callWaiterAt: Date.now() });
    } catch (_) {
      // 
    } finally {
      setTimeout(() => { this.waiterRequested = false; }, 3000);
    }
  }
}
