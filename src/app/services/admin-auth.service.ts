import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private key = 'adminAuth';

  isAuthenticated(): boolean {
    try {
      return (sessionStorage.getItem(this.key) === '1');
    } catch {
      return false;
    }
  }

  signIn(username: string, password: string): boolean {
    const ok = username.trim() === 'admin' && password === 'admin132';
    if (ok) {
      try { sessionStorage.setItem(this.key, '1'); } catch {}
    }
    return ok;
  }

  signOut(): void {
    try { sessionStorage.removeItem(this.key); } catch {}
  }
}
