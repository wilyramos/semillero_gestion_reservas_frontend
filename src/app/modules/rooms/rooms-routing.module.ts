import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsPageComponent } from './pages/rooms-page/rooms-page.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { RoomEditPageComponent } from './pages/room-edit-page/room-edit-page.component';
import { RoomAddPageComponent } from './pages/room-add-page/room-add-page.component';

const routes: Routes = [
  { path: '', component: RoomsPageComponent },
  { path: 'new', component: RoomAddPageComponent },
  { path: 'edit/:id', component: RoomEditPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
