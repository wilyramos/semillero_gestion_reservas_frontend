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
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.authService.login(email, password)
      .subscribe({
        next: (response) => {
          console.log('Sesión iniciada correctamente');
          this.router.navigate(['/', 'rooms']);
        },
        error: (err) => {
          this.errorSession = true;
          console.error('Error de login', err);
        }
      });
  }
}