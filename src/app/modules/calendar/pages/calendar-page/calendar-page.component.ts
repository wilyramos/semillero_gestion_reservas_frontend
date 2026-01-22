import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { RoomsService } from '@modules/rooms/services/rooms.service'; // Asegura esta ruta
import { Sala } from '@core/models/sala.model';
import { CalendarOptions, EventClickArg, DateSelectArg, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  private currentUsername: string = '';

  // Variables para el filtro de salas
  salas: Sala[] = [];
  selectedSalaId: number | null = null;

  private lastInicio: string = '';
  private lastFin: string = '';

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: esLocale,
    slotMinTime: '07:00:00',
    slotMaxTime: '21:00:00',
    allDaySlot: false,
    nowIndicator: true,
    selectable: true,
    height: 'auto',

    datesSet: this.handleDatesSet.bind(this),
    events: []
  };

  constructor(
    private reservationService: ReservationsService,
    private roomsService: RoomsService, // Inyectamos RoomsService
    private authService: AuthService
  ) {
    this.currentUsername = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe({
      next: (data) => this.salas = data,
      error: (err) => console.error('Error cargando salas:', err)
    });
  }

  /**
   * Se dispara al cambiar la sala en el select
   */
  onSalaChange(): void {
    // Si ya tenemos un rango de fechas cargado, refrescamos
    if (this.lastInicio && this.lastFin) {
      this.fetchReservations(this.lastInicio, this.lastFin);
    }
  }

  handleDatesSet(dateInfo: DatesSetArg): void {
    this.lastInicio = this.formatDate(dateInfo.start);
    this.lastFin = this.formatDate(dateInfo.end);
    this.fetchReservations(this.lastInicio, this.lastFin);
  }

  fetchReservations(inicio: string, fin: string): void {
    // Pasamos el idSala al servicio (si es null, el servicio no lo enviará)
    this.reservationService.searchByDates(inicio, fin, this.selectedSalaId || undefined).subscribe({
      next: (reservations) => {
        const eventData = reservations.map(res => {
          const isMine = res.username === this.currentUsername;
          const isCancelled = res.estado === 'CANCELADA';

          return {
            id: res.idReserva.toString(),
            title: isMine ? `[Mía] ${res.nombreSala}` : `${res.username}: ${res.nombreSala}`,
            start: res.fechaInicio,
            end: res.fechaFin,
            backgroundColor: isCancelled ? '#ef4444' : (isMine ? '#2563eb' : '#94a3b8'),
            borderColor: isCancelled ? '#dc2626' : (isMine ? '#1d4ed8' : '#64748b'),
            extendedProps: {
              owner: res.username,
              isMine: isMine,
              status: res.estado
            }
          };
        });

        // RE-ASIGNAR EL OBJETO COMPLETO para forzar el renderizado
        this.calendarOptions = {
          ...this.calendarOptions,
          events: eventData
        };
      },
      error: (err) => console.error('Error al filtrar:', err)
    });
  }

  private formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
}