import { Injectable } from '@angular/core';
import { Database, ref, update } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class SyncService {
  constructor(private db: Database) {}

  async touchRestaurantMenu(restaurantId: string): Promise<void> {
    const metaRef = ref(this.db, `restaurants/${restaurantId}/meta`);
    await update(metaRef, { lastMenuUpdateAt: Date.now() });
  }
}
