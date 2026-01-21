import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reserva } from '@core/models/reserva.model';
import { ReservationFormComponent } from '@modules/reservations/components/reservation-form/reservation-form.component';
import { ReservationsService } from '@modules/reservations/services/reservations.service';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css'],
})
export class ReservationsPageComponent {
  reservations: Reserva[] = [];
  loading: boolean = false;

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.reservationsService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  onCancel(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
      this.reservationsService
        .cancelarReserva({ idReserva: id, motivo: 'Cancelada desde UI' })
        .subscribe({
          next: () => {
            this.reservations = this.reservations.filter(
              (res) => res.idReserva !== id
            );
          },
        });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed:', result);
    });
  }
}
