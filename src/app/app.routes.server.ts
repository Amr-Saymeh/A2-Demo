import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: ':restId',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/category/:categoryKey',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/t/:tableId',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/dashboard',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/stats',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/ManageMenuComponent',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/EditItemComponent',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/kitchen-orders',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/bar-orders',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/hookah-orders',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/ordering-dashboard',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/attendance',
    renderMode: RenderMode.Server
  },
  {
    path: ':restId/add-employee',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];