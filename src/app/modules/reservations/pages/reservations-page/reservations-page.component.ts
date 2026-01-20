import { Component } from '@angular/core';
import { Reserva } from '@core/models/reserva.model';
import { ReservationsService } from '@modules/reservations/services/reservations.service';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css']
})
export class ReservationsPageComponent {

reservations: Reserva[] = [];
  loading: boolean = false;

  constructor(private reservationsService: ReservationsService) {}

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
      error: () => this.loading = false
    });
  }

  onCancel(id: number): void {
    if (confirm('¿Está seguro de que desea cancelar esta reserva?')) {
      this.reservationsService.cancelReservation(id).subscribe(() => {
        this.loadData(); // Recargamos la lista
      });
    }
  }
}