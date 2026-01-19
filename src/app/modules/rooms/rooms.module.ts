import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { SharedModule } from '@shared/shared.module';
import { RoomAddPageComponent } from './pages/room-add-page/room-add-page.component';
import { RoomEditPageComponent } from './pages/room-edit-page/room-edit-page.component';


@NgModule({
  declarations: [
    RoomsPageComponent,
    RoomFormComponent,
    RoomAddPageComponent,
    RoomEditPageComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule
  ]
})
export class RoomsModule { }
