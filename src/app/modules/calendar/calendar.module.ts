import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from '@shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CalendarPageComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    SharedModule,
    MatSnackBarModule
  ]
})
export class CalendarModule { }
