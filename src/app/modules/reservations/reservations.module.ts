import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [ReservationsPageComponent, ReservationFormComponent],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class ReservationsModule {}
