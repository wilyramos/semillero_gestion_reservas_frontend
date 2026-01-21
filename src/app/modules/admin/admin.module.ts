import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AdminPageComponent,
    UserManagementComponent,
    DashboardComponent,
    ReservationsAdminComponent,
    UserFormComponent // <--- 1. DECLARAR AQUÍ
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgChartsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    // 2. AGREGAR MÓDULOS DE MATERIAL
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class AdminModule { }