import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    CalendarPageComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule
  ]
})
export class CalendarModule { }
