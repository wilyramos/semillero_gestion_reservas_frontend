import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from '@core/models/reserva.model';
import { ReservationFormComponent } from '@modules/reservations/components/reservation-form/reservation-form.component';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css'],
})
export class ReservationsPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['idReserva', 'nombreSala', 'username', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Reserva>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadData(): void {
    this.reservationsService.getAllReservations().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: () => {}
    });
  }

  onCancel(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar Reserva',
        message: '¿Está seguro de que desea cancelar esta reserva?',
        confirmText: 'Sí, cancelar',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reservationsService
          .cancelarReserva({ idReserva: id, motivo: 'Cancelada desde UI' })
          .subscribe({
            next: () => {
              this.loadData();
            },
          });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
