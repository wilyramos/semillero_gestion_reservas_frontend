import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageResponse, PaginationModel } from '@core/models/pagination.model';
import { Reserva } from '@core/models/reserva.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioResponse } from '@core/models/usuario.model';

export interface DashboardStats {
  totalReservasHoy: number;
  salaMayorDemanda: string;
  reservasPorSalaSemana: { [key: string]: number } | null;
  horasPico: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }

  getReservasPage(params: PaginationModel): Observable<PageResponse<Reserva>> {
    return this.http.post<PageResponse<Reserva>>(`${this.apiUrl}/reservas/paginado`, params);
  }

  getUsuariosPage(params: PaginationModel): Observable<PageResponse<UsuarioResponse>> {
    return this.http.post<PageResponse<UsuarioResponse>>(`${this.apiUrl}/usuarios/paginado`, params);
  }

}