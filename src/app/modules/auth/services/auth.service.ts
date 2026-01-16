import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }


  private readonly apiUrl = 'http://localhost:3000/auth';

  login(user: string, pass: string): Observable<any> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/login`, {
      email: user,
      password: pass
    }).pipe(
      tap(response => {
        this.cookieService.set('auth_token', response.token);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('auth_token');
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

}
