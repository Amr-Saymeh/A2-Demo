import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { firebaseService } from '../services/restaurant.service';
import { TableSessionService, TableSession } from '../services/table-session.service';

interface Category {
  key: string;
  name: string;
  nameArabic: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="hero-banner text-white">
      <div class="overlay d-flex align-items-center justify-content-center text-center">
        <div>
          @if (signedIn && session) {
            <div class="mb-3">
              <!--<div class="alert alert-success d-inline-flex align-items-center gap-3">
              <span>Hi, {{ getTableDisplayName() }}</span>
              <button class="btn btn-sm btn-outline-light" (click)="checkout()">Checkout</button>
            </div>-->
          </div>
        }
        <h1 class="display-4 fw-bold">
          {{ isArabic ? 'مرحباً بكم في ' + (restaurant?.restArabicName || '') : 'Welcome to ' + (restaurant?.restName || '') }}
        </h1>
        <p class="lead">
          {{ isArabic ? (restaurant?.restArabicPhrase || '') : (restaurant?.restPhrase || '') }}
        </p>
        <!-- Explore Menu Navigation -->
        <div class="explore-menu mt-5">
          <h4 class="mb-4" style="color: white;">{{ isArabic ? 'اكتشف نكهاتنا الرائعة' : 'Explore Our Menu' }}</h4>
          <div class="category-links">
            @for (cat of categories; track cat) {
              <a [routerLink]="['/', (session?.restId || restId), 'category', cat.key]" class="category-link">
                <div class="icon-container">
                  <i [class]="cat.icon"></i>
                </div>
                <span>{{ isArabic ? cat.nameArabic : cat.name }}</span>
              </a>
            }
          </div>
        </div>
      </div>
    </div>
    </div>
    `,
  styles: [`
    .hero-banner {
      background-image: url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80');
      background-size: cover;
      background-position: center;
      height: 100vh;
      position: relative;
      overflow-y: auto;
    }

    .overlay {
      background-color: rgba(0, 0, 0, 0.6);
      height: 100%;
      width: 100%;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Category Navigation Styles */
    .explore-menu {
      margin-top: 2rem;
    }
    
    .category-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      max-width: 900px;
      margin: 0 auto;
    }

    .category-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: white;
      transition: all 0.3s ease;
      padding: 0.5rem;
      border-radius: 8px;
      width: 110px;
      text-align: center;
    }

    .category-link:hover {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.1);
    }

    .icon-container {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .category-link:hover .icon-container {
      background-color: rgba(255, 107, 107, 0.8);
    }
    
    @media (max-width: 768px) {
      .category-links {
        gap: 0.75rem;
      }
      
      .category-link {
        width: 90px;
        font-size: 0.85rem;
      }
      
      .icon-container {
        height: 40px;
        width: 40px;
        font-size: 1.2rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  
  isArabic = false;
  restaurant: any = null;
  categories: Category[] = [];
  session: TableSession | null = null;
  signedIn = false;
  restId: string = '';
  

  constructor(private languageService: LanguageService, private tableSession: TableSessionService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.languageService.isArabic$.subscribe(lang => this.isArabic = lang);
    this.isArabic = this.languageService.getCurrentLanguage();
    const urlRestId = this.route.snapshot.paramMap.get('restId');
    const restId = urlRestId || '';
    this.restId = restId;
    if (!restId) {
      return;
    }
    const rest = await firebaseService.getRestaurantById(restId);

    if (rest) {
      this.restaurant = rest;
      let categoriesObj = rest.menu?.categories || {};
      if (!categoriesObj || Object.keys(categoriesObj).length === 0) {
        categoriesObj = (await firebaseService.getCategories(restId)) || {};
      }
      this.categories = Object.entries(categoriesObj).map(([key, value]: [string, any]) => ({
        key,
        name: value.name || '',
        nameArabic: value.nameArabic || '',
        icon: value.icon || 'fas fa-utensils',
      }));
    }

    // Subscribe to table session and auth state
    this.tableSession.signedIn$.subscribe(s => this.signedIn = s);
    this.tableSession.session$.subscribe(sess => this.session = sess);
  }

  getTableDisplayName(): string {
    const s = this.session;
    if (!s) return '';
    return s.tableName || s.tableId;
  }

  async checkout() {
    await this.tableSession.checkout();
  }
}
