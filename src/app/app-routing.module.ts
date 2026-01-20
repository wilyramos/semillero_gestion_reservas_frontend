import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { SkeletonComponent } from './layouts/skeleton/skeleton.component';

const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    {
        path: '',
        canActivate: [authGuard],
        component: SkeletonComponent,
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
    { path: '**', redirectTo: 'auth' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }