import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { TableSigninComponent } from './pages/table-signin/table-signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ControlBoardComponent } from './pages/control-board/control-board.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { HookahOrdersComponent } from './pages/hookah-orders/hookah-orders.component';
import { BarOrdersComponent } from './pages/bar-orders/bar-orders.component';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { StatsComponent } from './pages/stats/stats.component';
import { OrderingDashboardComponent } from './pages/ordering-dashboard/ordering-dashboard.component';
import { AttendancePageComponent } from './pages/attendance-page/attendance-page.component';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';


export const routes: Routes = [
  { path: '', redirectTo: 'rest1', pathMatch: 'full' },
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: ':restId', component: HomeComponent },
  { path: ':restId/category/:categoryKey', component: CategoryComponent },
  { path: ':restId/t/:tableId', component: TableSigninComponent },
  { path: ':restId/control-board', component: ControlBoardComponent },
  { path: ':restId/dashboard', component: DashboardComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/stats', component: StatsComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/ManageMenuComponent', component: ManageMenuComponent, canActivate: [adminAuthGuard] }, 
  { path: ':restId/EditItemComponent', component: EditItemComponent, canActivate: [adminAuthGuard] }, 
  { path: ':restId/kitchen-orders', component: KitchenOrdersComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/bar-orders', component: BarOrdersComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/hookah-orders', component: HookahOrdersComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/ordering-dashboard', component: OrderingDashboardComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/attendance', component: AttendancePageComponent, canActivate: [adminAuthGuard] },
  { path: ':restId/add-employee', component: AddEmployeePageComponent, canActivate: [adminAuthGuard] },
  { path: '**', redirectTo: '' }
];


