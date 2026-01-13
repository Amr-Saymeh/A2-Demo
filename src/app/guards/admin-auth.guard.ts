import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Determine restId from current route params or URL
  const restId = route.params?.['restId'] || state.url.split('/').filter(Boolean)[0] || 'rest1';
  router.navigate(['/', restId, 'control-board']);
  return false;
};
