import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { ManageMenuComponent } from './pages/manage-menu/manage-menu.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { TableSigninComponent } from './pages/table-signin/table-signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HookahOrdersComponent } from './pages/hookah-orders/hookah-orders.component';
import { BarOrdersComponent } from './pages/bar-orders/bar-orders.component';
import { KitchenOrdersComponent } from './pages/kitchen-orders/kitchen-orders.component';
import { StatsComponent } from './pages/stats/stats.component';
import { OrderingDashboardComponent } from './pages/ordering-dashboard/ordering-dashboard.component';
import { AttendancePageComponent } from './pages/attendance-page/attendance-page.component';
import { AddEmployeePageComponent } from './pages/add-employee-page/add-employee-page.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cart',loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent)},
  { path: ':restId', component: HomeComponent },
  { path: ':restId/category/:categoryKey', component: CategoryComponent },
  { path: ':restId/t/:tableId', component: TableSigninComponent },
  { path: ':restId/dashboard', component: DashboardComponent },
  { path: ':restId/stats', component: StatsComponent },
  { path: ':restId/ManageMenuComponent', component: ManageMenuComponent }, 
  { path: ':restId/EditItemComponent', component: EditItemComponent }, 
  { path: ':restId/kitchen-orders', component: KitchenOrdersComponent },
  { path: ':restId/bar-orders', component: BarOrdersComponent },
  { path: ':restId/hookah-orders', component: HookahOrdersComponent },
  { path: ':restId/ordering-dashboard', component: OrderingDashboardComponent },
  { path: ':restId/attendance', component: AttendancePageComponent},
  { path: ':restId/add-employee', component: AddEmployeePageComponent },
  { path: '**', redirectTo: '' }
];