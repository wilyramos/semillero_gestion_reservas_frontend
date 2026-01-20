import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearReservaRequest, Reserva } from '@core/models/reserva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {


  private readonly apiUrl = 'http://localhost:8080/reservas';

  crearReserva(reserva: CrearReservaRequest): Observable<Reserva> {
      return this.http.post<Reserva>(`${this.apiUrl}/crear`, reserva);
  }

  cancelarReserva(id: number): Observable<Reserva> {
      return this.http.post<Reserva>(`${this.apiUrl}/cancelar`, { id });
  }
  private mockReservations: Reserva[] = [
    {
      idReserva: 1,
      idSala: 101,
      idUsuario: 1001,
      fechaInicio: new Date('2026-01-19T10:00:00'),
      fechaFin: new Date('2026-01-19T12:00:00'),
      estado: 'ACTIVA'
    },
    {
      idReserva: 2,
      idSala: 102,
      idUsuario: 1002,
      fechaInicio: new Date('2026-01-19T14:00:00'),
      fechaFin: new Date('2026-01-20T16:00:00'),
      estado: 'CANCELADA'
    }
  ];


  constructor(private http: HttpClient) { }

  getAllReservations() {
    // return this.http.get<Reserva[]>(`${this.apiUrl}`);
    return new Observable<Reserva[]>(observer => {
      observer.next(this.mockReservations);
      observer.complete();
    });
  }

  cancelReservation(id: number): Observable<any> {
    // En producción: return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
    const res = this.mockReservations.find(r => r.idReserva === id);
    if (res) res.estado = 'CANCELADA';
    return new Observable(obs => { obs.next(res); obs.complete(); });
  }
}
