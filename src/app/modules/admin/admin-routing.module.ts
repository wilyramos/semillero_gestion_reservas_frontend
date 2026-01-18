import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: AdminPageComponent
      },

      // Gestión de usuarios
      // {
      //   path: 'usuarios',
      //   loadChildren: () =>
      //     import('./components/user-management/user-management.module')
      //       .then(m => m.UserManagementModule)
      // },

      {
        path: 'salas',
        loadChildren: () =>
          import('../rooms/rooms.module')
            .then(m => m.RoomsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
