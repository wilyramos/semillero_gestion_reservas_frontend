import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';

const routes: Routes = [
  {
    // El path vacío aquí representa '/admin' (definido en AppRoutingModule)
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'salas',
        loadChildren: () =>
          import('../rooms/rooms.module')
            .then(m => m.RoomsModule)
      },
      // {
      //   path: 'usuarios',
      //   loadChildren: () =>
      //     import('./pages/user-management/user-management.module')
      //       .then(m => m.UserManagementModule)
      // },
      // // Ruta para auditoría general de todas las reservas
      {
        path: 'todas-las-reservas',
        component: ReservationsAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }