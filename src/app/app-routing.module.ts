import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [

    {
        path: 'login',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '',
        canActivate: [authGuard],
        children: [

            {
                path: 'reservas',
                loadChildren: () =>
                    import('./modules/reservations/reservations.module')
                        .then(m => m.ReservationsModule)
            },
            {
                path: 'calendario',
                loadChildren: () =>
                    import('./modules/calendar/calendar.module')
                        .then(m => m.CalendarModule)
            },

            {
                path: 'admin',
                canActivate: [adminGuard],
                loadChildren: () =>
                    import('./modules/admin/admin.module')
                        .then(m => m.AdminModule)
            }
        ]
    },

    { path: '', redirectTo: 'reservas', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }