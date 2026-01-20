import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '@core/models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }


  private readonly apiUrl = 'http://localhost:8080/api/auth';

  login(user: string, pass: string): Observable<any> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, {
      username: user,
      password: pass
    }).pipe(
      tap(response => {
        console.log('Respuesta del login:', response);
        this.cookieService.set('auth_token', response.token);
        console.log('Token almacenado en la cookie:', response.token);
      
      })
    );
  }

  logout(): void {
    this.cookieService.delete('auth_token');
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) {
      return [];
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roles || [];
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return [];
    }
  }

}
