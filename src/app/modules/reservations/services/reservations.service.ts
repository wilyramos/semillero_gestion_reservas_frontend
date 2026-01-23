import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearReservaRequest, Reserva, CancelarReservaRequest } from '@core/models/reserva.model';
import { environment } from 'src/environments/environment';
import { PaginationModel } from '@core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private readonly apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {
    console.log('ReservationsService initialized with API URL:', this.apiUrl);
  }

  getAllReservations(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/listar`);
  }

  getCalendarData(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/calendario`);
  }

  crearReserva(reserva: CrearReservaRequest): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.apiUrl}/crear`, reserva);
  }

  cancelarReserva(request: CancelarReservaRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancelar`, request);
  }

  getReservationsByUser(username: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${username}`);
  }


  searchByDates(
  inicio: string, 
  fin: string, 
  extraFilters: { idSala?: number, estado?: string, username?: string, nombreSala?: string } = {}
): Observable<Reserva[]> {
  let params = new HttpParams()
    .set('inicio', inicio)
    .set('fin', fin);

  // Mapeo dinámico de filtros opcionales
  if (extraFilters.idSala) params = params.set('idSala', extraFilters.idSala.toString());
  if (extraFilters.estado) params = params.set('estado', extraFilters.estado);
  if (extraFilters.username) params = params.set('username', extraFilters.username);
  if (extraFilters.nombreSala) params = params.set('nombreSala', extraFilters.nombreSala);

  return this.http.get<Reserva[]>(`${this.apiUrl}/buscar`, { params });
}

  getReservasPageByUser(username: string, pagination: PaginationModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paginado/${username}`, pagination);
  }
}
