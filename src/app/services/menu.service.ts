import { Injectable, NgZone } from '@angular/core';
import { Database, ref, push, set, onValue, remove, get } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private db: Database, private ngZone: NgZone, private sync: SyncService) {}

  // ✅ Add a category
  async addCategory(restaurantId: string, category: any) {
    const categoriesRef = ref(this.db, `restaurants/${restaurantId}/menu/categories`);
    const newCategoryRef = push(categoriesRef);
    await set(newCategoryRef, category);
    await this.sync.touchRestaurantMenu(restaurantId);
  }

  // ✅ Add an item into a category
  async addItem(restaurantId: string, categoryId: string, item: any) {
    const itemsRef = ref(this.db, `restaurants/${restaurantId}/menu/categories/${categoryId}/items`);
    const newItemRef = push(itemsRef);
    await set(newItemRef, item);
    await this.sync.touchRestaurantMenu(restaurantId);
  }

  // ✅ Get all categories (with items) for a restaurant
  getCategories(restaurantId: string): Observable<any> {
    return new Observable((observer) => {
      const categoriesRef = ref(this.db, `restaurants/${restaurantId}/menu/categories`);
      const unsubscribe = onValue(
        categoriesRef,
        (snapshot) => {
          // Ensure callbacks run inside Angular zone for change detection
          this.ngZone.run(() => {
            observer.next(snapshot.val() ?? {});
          });
        },
        (error) => {
          this.ngZone.run(() => observer.error(error));
        }
      );
      // Teardown logic: detach listener on unsubscribe
      return () => unsubscribe();
    });
  }

  // ✅ One-time fetch of all categories (with items) for a restaurant
  // Use this to avoid a persistent subscription when you only need the data once.
  async getCategoriesOnce(restaurantId: string): Promise<any> {
    const categoriesRef = ref(this.db, `restaurants/${restaurantId}/menu/categories`);
    const snap = await get(categoriesRef);
    return snap.exists() ? snap.val() : {};
  }

  // ✅ Get items for one category
  getItems(restaurantId: string, categoryId: string): Observable<any> {
    return new Observable((observer) => {
      const itemsRef = ref(this.db, `restaurants/${restaurantId}/menu/categories/${categoryId}/items`);
      const unsubscribe = onValue(
        itemsRef,
        (snapshot) => {
          this.ngZone.run(() => {
            observer.next(snapshot.val() ?? {});
          });
        },
        (error) => {
          this.ngZone.run(() => observer.error(error));
        }
      );
      return () => unsubscribe();
    });
  }

  // ✅ Edit an existing item
  async editItem(restaurantId: string, categoryId: string, itemId: string, updatedItem: any) {
    const itemRef = ref(this.db, `restaurants/${restaurantId}/menu/categories/${categoryId}/items/${itemId}`);
    await set(itemRef, updatedItem);
    await this.sync.touchRestaurantMenu(restaurantId);
  }
  async removeItem(restaurantId: string, categoryId: string, itemId: string) {
    const itemRef = ref(this.db, `restaurants/${restaurantId}/menu/categories/${categoryId}/items/${itemId}`);
    await remove(itemRef);
    await this.sync.touchRestaurantMenu(restaurantId);
  }
}
