import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  mainMenu: {
    defaultOptions: Array<any>,
    accessLink: Array<any>
  } = {
      defaultOptions: [],
      accessLink: []
    }

  customOptions: Array<any> = [];

  ngOnInit(): void {
    // Opciones principales del sistema
    this.mainMenu.defaultOptions = [
      {
        name: 'Salas',
        icon: 'uil-building',
        router: ['/', 'rooms']
      },
      {
        name: 'Reservas',
        icon: 'uil-calendar-alt',
        router: ['/', 'reservations']
      },
      {
        name: 'Calendario',
        icon: 'uil-schedule',
        router: ['/', 'calendar']
      }
    ];

    // Opciones secundarias
    this.mainMenu.accessLink = [
      {
        name: 'Panel Admin',
        icon: 'uil-setting',
        router: ['/', 'admin']
      }
    ];
  }
}