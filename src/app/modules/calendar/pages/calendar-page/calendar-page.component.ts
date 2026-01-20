import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  // Configuración del Calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'es',
    editable: true,
    selectable: true,
    events: [] 
  };

  constructor(
    private reservationService: ReservationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.reservationService.getAllReservations().subscribe({
      next: (reservations) => {
        // Transformamos las reservas del servicio al formato de FullCalendar
        const eventData = reservations.map(reservation => ({
          title: `Sala ${reservation.idSala} (${reservation.estado})`,
          start: reservation.fechaInicio,
          end: reservation.fechaFin,
          // Lógica de colores por estado
          allDay: false
        }));

        this.calendarOptions.events = eventData;
      },
      error: (err) => console.error('Error al cargar eventos del calendario', err)
    });
  }
}