import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
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
    
    // CALLBACK CLAVE: Se ejecuta al cambiar de mes/semana/día
    datesSet: this.handleDatesSet.bind(this),
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    events: []
  };

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService
  ) { 
    this.currentUsername = this.authService.getUsername(); 
  }

  ngOnInit(): void { }

  /**
   * Se dispara automáticamente cuando el rango de fechas del calendario cambia.
   */
  handleDatesSet(dateInfo: DatesSetArg): void {
    const inicio = this.formatDate(dateInfo.start);
    const fin = this.formatDate(dateInfo.end);

    console.log(`Cargando rango: ${inicio} - ${fin}`);
    this.fetchReservations(inicio, fin);
  }

  fetchReservations(inicio: string, fin: string): void {
    // Usamos searchByDates en lugar de getCalendarData
    this.reservationService.searchByDates(inicio, fin).subscribe({
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

        this.calendarOptions.events = eventData;
      },
      error: (err) => console.error('Error al filtrar por fechas:', err)
    });
  }

  /**
   * Utilidad para formatear Date a "dd-MM-yyyy HH:mm:ss"
   */
  private formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const isMine = clickInfo.event.extendedProps['isMine'];
    if (isMine || this.authService.hasRole('ROLE_ADMIN')) {
      // Lógica de edición/cancelación
    } else {
      alert('Solo lectura: Reserva de otro usuario.');
    }
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    // Lógica para abrir modal de creación
  }
}