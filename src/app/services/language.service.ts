import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private isArabicSubject = new BehaviorSubject<boolean>(false);
  public isArabic$: Observable<boolean> = this.isArabicSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Check if there's a saved language preference (only in browser)
    if (this.isBrowser) {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage === 'ar') {
        this.setLanguage(true);
      }
    }
  }

  public setLanguage(isArabic: boolean): void {
    this.isArabicSubject.next(isArabic);
    
    if (this.isBrowser) {
      document.documentElement.setAttribute('lang', isArabic ? 'ar' : 'en');
      localStorage.setItem('preferredLanguage', isArabic ? 'ar' : 'en');
    }
  }

  public toggleLanguage(): void {
    const currentValue = this.isArabicSubject.value;
    this.setLanguage(!currentValue);
  }

  public getCurrentLanguage(): boolean {
    return this.isArabicSubject.value;
  }
}
