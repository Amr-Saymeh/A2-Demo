// firebaseService.js
import { db } from "../firebase";
import { ref, get, child } from "firebase/database";

class FirebaseService {
  /**
   * Get all restaurants
   */
  async getAllRestaurants() {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "restaurants"));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }

  /**
   * Get a single restaurant by ID
   * @param {string} restaurantId 
   */
  async getRestaurantById(restaurantId: any) {
    const cacheKey = this.cacheKeyRestaurant(restaurantId);
    const cached = this.getCache(cacheKey) as { data: any; lastUpdateAt: number } | null;
    try {
      const remoteLast = await this.getRemoteLastMenuUpdateAt(restaurantId);
      if (remoteLast == null && cached?.data) {
        return cached.data;
      }
      if (cached && cached.data && remoteLast != null && cached.lastUpdateAt === remoteLast) {
        return cached.data;
      }
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `restaurants/${restaurantId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.setCache(cacheKey, { data, lastUpdateAt: remoteLast ?? Date.now() });
        return data;
      }
      return null;
    } catch (error) {
      if (cached?.data) return cached.data;
      console.error(`Error fetching restaurant ${restaurantId}:`, error);
      throw error;
    }
  }

  /**
   * Get all categories for a restaurant
   * @param {string} restaurantId 
   */
  async getCategories(restaurantId: any) {
    const cacheKey = this.cacheKeyCategories(restaurantId);
    const cached = this.getCache(cacheKey) as { data: any; lastUpdateAt: number } | null;
    try {
      const remoteLast = await this.getRemoteLastMenuUpdateAt(restaurantId);
      if (remoteLast == null && cached?.data) {
        return cached.data;
      }
      if (cached && cached.data && remoteLast != null && cached.lastUpdateAt === remoteLast) {
        return cached.data;
      }
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `restaurants/${restaurantId}/menu/categories`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.setCache(cacheKey, { data, lastUpdateAt: remoteLast ?? Date.now() });
        return data;
      }
      // if no remote data but we have cache, return it
      if (cached?.data) return cached.data;
      return null;
    } catch (error) {
      if (cached?.data) return cached.data;
      console.error(`Error fetching categories for ${restaurantId}:`, error);
      throw error;
    }
  }

  /**
   * Get a single category for a restaurant
   * @param {string} restaurantId 
   * @param {string} categoryKey
   */
  async getCategory(restaurantId: any, categoryKey: string) {
    const all = await this.getCategories(restaurantId);
    if (!all) return null;
    return all[categoryKey] ?? null;
  }

  // Cache-only reads (no DB calls)
  getCategoriesFromCache(restaurantId: string): any | null {
    const cacheKey = this.cacheKeyCategories(restaurantId);
    const cached = this.getCache(cacheKey) as { data: any; lastUpdateAt: number } | null;
    return cached?.data ?? null;
  }
  getCategoryFromCache(restaurantId: string, categoryKey: string): any | null {
    const all = this.getCategoriesFromCache(restaurantId);
    if (!all) return null;
    return all[categoryKey] ?? null;
  }

  // --- caching helpers ---
  private prefix = 'ty-cache:v1';
  private cacheKeyRestaurant(id: string) { return `${this.prefix}:restaurants:${id}:data`; }
  private cacheKeyCategories(id: string) { return `${this.prefix}:restaurants:${id}:menu:categories`; }
  private getCache(key: string): any | null {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : null;
    } catch (_) {
      return null;
    }
  }
  private setCache(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // ignore storage errors
    }
  }
  private async getRemoteLastMenuUpdateAt(restaurantId: string): Promise<number | null> {
    try {
      const dbRef = ref(db);
      const snap = await get(child(dbRef, `restaurants/${restaurantId}/meta/lastMenuUpdateAt`));
      if (snap.exists()) {
        const v = snap.val();
        const n = typeof v === 'number' ? v : Number(v);
        return isFinite(n) ? n : null;
      }
      return null;
    } catch (_) {
      return null;
    }
  }
}

export const firebaseService = new FirebaseService();
