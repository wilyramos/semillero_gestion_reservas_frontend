import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importar NavigationEnd
import { filter } from 'rxjs/operators'; // Importar filter
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  username: string = '';
  role: string = '';
  today: number = Date.now();
  isAuthenticated = false;
  pageName: string = 'Dashboard';

  // Diccionario de rutas y sus títulos correspondientes
  private readonly routeTitles: { [key: string]: string } = {
    '/admin/dashboard': 'Panel Principal',
    '/admin/todas-las-reservas': 'Auditoría de Reservas',
    '/admin/usuarios': 'Gestión de Usuarios',
    '/admin/salas': 'Gestión de Salas',
    '/reservas': 'Mis Reservas',
    '/calendario': 'Calendario de Reservas',

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Escuchar cambios de ruta para actualizar el título
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updatePageName(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    if (this.isAuthenticated) {
      this.username = this.authService.getUsername();
      this.role = this.authService.getRoles()[0] ?? '';
    }
    
    // Establecer título inicial por si se refresca la página
    this.updatePageName(this.router.url);
  }

  private updatePageName(url: string): void {
    // Buscamos si la URL actual coincide con alguna llave de nuestro diccionario
    const matchedRoute = Object.keys(this.routeTitles).find(route => url.includes(route));
    this.pageName = matchedRoute ? this.routeTitles[matchedRoute] : 'Administración';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}