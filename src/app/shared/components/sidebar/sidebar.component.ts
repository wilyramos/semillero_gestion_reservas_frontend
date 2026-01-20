import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mainMenu: { defaultOptions: Array<any>, accessLink: Array<any> } = { 
    defaultOptions: [], 
    accessLink: [] 
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.generateMenu();
  }

  generateMenu(): void {
    // Opciones para todos
    this.mainMenu.defaultOptions = [
      { name: 'Calendario', icon: 'uil uil-calendar-alt', router: '/calendario' },
      { name: 'Mis Reservas', icon: 'uil uil-clipboard-notes', router: '/reservas' }
    ];

    // Para el admin
    if (this.authService.getRoles().includes('ADMIN')) {
      this.mainMenu.accessLink = [
        { name: 'Panel Admin', icon: 'uil uil-chart-pie', router: '/admin/dashboard' },
        { name: 'Gestión Salas', icon: 'uil uil-building', router: '/admin/salas' }
      ];
    }
  }
}