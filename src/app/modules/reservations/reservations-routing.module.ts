import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsPageComponent } from './pages/reservations-page/reservations-page.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationsPageComponent
  },
  // {
  //   path: 'nueva',
  //   // component: ReservationsPageComponent // create reservations
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
