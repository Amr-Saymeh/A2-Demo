import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { db } from '../firebase';
import { ref, update, get, child, remove, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';

export interface TableSession {
  restId: string;
  tableId: string;
  tableName?: string;
}

@Injectable({ providedIn: 'root' })
export class TableSessionService {
  private storageKey = 'tableSession';
  private sessionSubject = new BehaviorSubject<TableSession | null>(null);
  session$ = this.sessionSubject.asObservable();

  private signedInSubject = new BehaviorSubject<boolean>(false);
  signedIn$ = this.signedInSubject.asObservable();

  // Watcher for table state to auto-clear session when checked out remotely
  private tableWatcherUnsub: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize from localStorage only in browser
      this.sessionSubject.next(this.readSession());
      const auth = this.getAuthInstance();
      this.signedInSubject.next(!!auth.currentUser);
      onAuthStateChanged(auth, (user) => {
        this.signedInSubject.next(!!user);
      });

      // Ensure watcher reflects current session and future changes
      this.updateTableWatcher(this.sessionSubject.value);
      this.session$.subscribe(sess => this.updateTableWatcher(sess));
    }
  }

  getSession(): TableSession | null {
    return this.sessionSubject.value;
  }

  private readSession(): TableSession | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw || raw === 'null') return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private writeSession(session: TableSession | null) {
    if (!isPlatformBrowser(this.platformId)) {
      this.sessionSubject.next(session);
      return;
    }
    if (session) {
      localStorage.setItem(this.storageKey, JSON.stringify(session));
      // Also persist the table id as requested
      localStorage.setItem('table', session.tableId);
    } else {
      // As requested, set to null when checking out
      localStorage.setItem(this.storageKey, 'null');
      localStorage.setItem('table', 'null');
    }
    this.sessionSubject.next(session);
    // Update watcher whenever session changes
    this.updateTableWatcher(session);
  }

  async signInForTable(restId: string, tableId: string): Promise<TableSession> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Auth not available on the server');
    }
    const auth = this.getAuthInstance();
    await signInAnonymously(auth);

    // Validate that restaurant and table exist BEFORE any writes
    const dbRef = ref(db);
    try {
      const restSnap = await get(child(dbRef, `restaurants/${restId}`));
      if (!restSnap.exists()) {
        try { await signOut(auth); } catch {}
        throw new Error('Invalid table link: restaurant does not exist.');
      }
      const tableSnap = await get(child(dbRef, `restaurants/${restId}/tables/${tableId}`));
      if (!tableSnap.exists()) {
        try { await signOut(auth); } catch {}
        throw new Error('Invalid table link: table does not exist.');
      }
    } catch (e: any) {
      // If get() failed (permissions / network), surface message
      if (e?.message?.includes('does not exist')) throw e;
      try { await signOut(auth); } catch {}
      throw new Error(e?.message || 'Unable to verify table link.');
    }

    // Fetch table name for a friendly greeting (optional)
    let tableName: string | undefined = undefined;
    try {
      const nameSnap = await get(child(dbRef, `restaurants/${restId}/tables/${tableId}/name`));
      if (nameSnap.exists()) {
        tableName = nameSnap.val();
      }
    } catch (e) {
      console.warn('Could not read table name:', e);
    }

    // Set availability to false on sign-in (safe now; path exists)
    const tableRef = ref(db, `restaurants/${restId}/tables/${tableId}`);
    await update(tableRef, { availability: false });

    const session: TableSession = { restId, tableId, tableName };
    this.writeSession(session);
    return session;
  }

  async checkout(): Promise<void> {
    const session = this.getSession();
    if (session) {
      const tableRef = ref(db, `restaurants/${session.restId}/tables/${session.tableId}`);
      await update(tableRef, { availability: true });
      // Delete all orders for this table
      const ordersRef = ref(db, `restaurants/${session.restId}/tables/${session.tableId}/order`);
      try {
        await remove(ordersRef);
      } catch (e) {
        console.warn('Failed to clear orders on checkout:', e);
      }
    }

    // Clear local session and sign out
    this.writeSession(null);
    if (isPlatformBrowser(this.platformId)) {
      const auth = this.getAuthInstance();
      try {
        await signOut(auth);
      } catch (e) {
        console.warn('Sign out failed:', e);
      }
    }
  }

  private getAuthInstance() {
    // Use Web SDK Auth directly
    return getAuth();
  }

  private updateTableWatcher(session: TableSession | null) {
    // Detach previous watcher
    if (this.tableWatcherUnsub) { try { this.tableWatcherUnsub(); } catch {} this.tableWatcherUnsub = null; }
    if (!session || !isPlatformBrowser(this.platformId)) return;
    const tableRef = ref(db, `restaurants/${session.restId}/tables/${session.tableId}`);
    this.tableWatcherUnsub = onValue(tableRef, async (snap) => {
      const v = snap.val();
      // If table is removed or marked available again -> clear local session and sign out
      if (!v || v.availability === true) {
        const auth = this.getAuthInstance();
        this.writeSession(null);
        try { await signOut(auth); } catch {}
      }
    });
  }
}
