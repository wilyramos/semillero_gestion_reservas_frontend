import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {
  user: any = { username: 'Admin', role: 'ADMIN' }; // Mocked user data
  today: number = Date.now();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // daots del usuario del authservice
  }

  logout(): void {
    // usar authservice

  }
}