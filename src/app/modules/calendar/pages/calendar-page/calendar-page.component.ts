import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { RoomsService } from '@modules/rooms/services/rooms.service';
import { Sala } from '@core/models/sala.model';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ReservationFormComponent } from '@modules/reservations/components/reservation-form/reservation-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {

  // Listados y Filtros
  salas: Sala[] = [];

  // Modelos para los filtros
  selectedSalaId: number | null = null;
  selectedEstado: string = '';
  searchUsername: string = '';
  searchNombreSala: string = '';

  private currentUsername: string = '';
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
    private roomsService: RoomsService,
    private authService: AuthService,
    private dialog: MatDialog

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
   * Gatillo único para cualquier cambio en los filtros
   */
  onFilterChange(): void {
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
    // Preparamos el objeto de filtros extra
    const filters = {
      idSala: this.selectedSalaId || undefined,
      estado: this.selectedEstado || undefined,
      username: this.searchUsername || undefined,
      nombreSala: this.searchNombreSala || undefined
    };

    this.reservationService.searchByDates(inicio, fin, filters).subscribe({
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

        this.calendarOptions = {
          ...this.calendarOptions,
          events: eventData
        };
      },
      error: (err) => console.error('Error al filtrar:', err)
    });
  }

  resetFilters(): void {
    this.selectedSalaId = null;
    this.selectedEstado = '';
    this.searchUsername = '';
    this.searchNombreSala = '';
    this.onFilterChange();
  }

  private formatDate(date: Date): string {
    const pad = (n: number) => n < 10 ? '0' + n : n;
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
        // Recargar las reservas en el calendario después de crear una nueva
        if (this.lastInicio && this.lastFin) {
          this.fetchReservations(this.lastInicio, this.lastFin);
        }
      }
    });
  }
}