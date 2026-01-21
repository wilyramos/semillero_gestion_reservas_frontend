import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';

interface MenuOption {
  name: string;
  icon: string;
  router: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  // Opciones públicas y para usuarios normales
  userMenu: MenuOption[] = [
    { name: 'Calendario', icon: 'uil uil-calendar-alt', router: '/calendario' },
    { name: 'Mis Reservas', icon: 'uil uil-clipboard-notes', router: '/reservas' }
  ];

  // Opciones exclusivas para administradores
  adminMenu: MenuOption[] = [];

  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminAccess();
  }

  checkAdminAccess(): void {
    if (this.authService.getRoles().includes('ROLE_ADMIN')) {
      this.adminMenu = [
        { name: 'Dashboard', icon: 'uil uil-chart-pie', router: '/admin/dashboard' },
        { name: 'Todas las Reservas', icon: 'uil uil-apps', router: '/admin/todas-las-reservas' },
        { name: 'Gestión Salas', icon: 'uil uil-building', router: '/admin/salas' },
        { name: 'Usuarios', icon: 'uil uil-users-alt', router: '/admin/usuarios' }
      ];
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}