import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {
  formLogin: FormGroup = new FormGroup({});
  errorSession: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  sendLogin(): void {
    const { username, password } = this.formLogin.value;

    this.authService.login(username, password)
      .subscribe({
        next: (response) => {
          console.log('Sesión iniciada correctamente');
          this.router.navigate(['/', 'reservas']);
        },
        error: (err) => {
          this.errorSession = true;
          console.error('Error de login', err);
        }
      });
  }
}