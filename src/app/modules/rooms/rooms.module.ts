import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomFormComponent } from './components/room-form/room-form.component';


@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomFormComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule
  ]
})
export class RoomsModule { }
