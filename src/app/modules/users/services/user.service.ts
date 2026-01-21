import { Injectable } from '@angular/core';
import { UsuarioResponse } from '@core/models/usuario.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private readonly apiUrl = `${environment.apiUrl}/usuarios`;

  createUser(userData: any): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}`, userData);
  }

  updateUser(idUsuario: number, userData: any): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(`${this.apiUrl}/${idUsuario}`, userData);
  }

  deleteUser(idUsuario: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idUsuario}`);
  }
}
