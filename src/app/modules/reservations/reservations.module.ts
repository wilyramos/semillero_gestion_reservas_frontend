import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';


@NgModule({
  declarations: [
    ReservationsPageComponent,
    ReservationFormComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule
  ]
})
export class ReservationsModule { }
