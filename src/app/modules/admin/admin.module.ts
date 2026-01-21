import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    UserManagementComponent,
    DashboardComponent,
    ReservationsAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgChartsModule,
  ]
})
export class AdminModule { }
