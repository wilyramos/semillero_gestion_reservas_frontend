import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Reserva, CancelarReservaRequest } from '@core/models/reserva.model';
import { ReservationFormComponent } from '@modules/reservations/components/reservation-form/reservation-form.component';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { FilterModel, PaginationModel, SortModel } from '@core/models/pagination.model';

@Component({
  selector: 'app-reservations-page',
  templateUrl: './reservations-page.component.html',
  styleUrls: ['./reservations-page.component.css'],
})
export class ReservationsPageComponent implements OnInit {
  reservas: Reserva[] = [];
  totalElements: number = 0;
  displayedColumns: string[] = ['idReserva', 'nombreSala', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];

  params: PaginationModel = {
    pageNumber: 0,
    rowsPerPage: 10,
    sorts: [{ colName: 'fechaInicio', direction: 'DESC' }],
    filters: []
  };

  constructor(
    private reservationsService: ReservationsService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const username = this.authService.getUsername();
    if (!username) {
      console.error('No se pudo obtener el username del usuario');
      return;
    }

    this.reservationsService.getReservasPageByUser(username, this.params).subscribe({
      next: (response) => {
        this.reservas = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Error al cargar reservas:', err)
    });
  }

  onCancel(reserva: Reserva): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar Reserva',
        message: `¿Está seguro de que desea cancelar la reserva #${reserva.idReserva}?`,
        confirmText: 'Sí, cancelar',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const request: CancelarReservaRequest = {
          idReserva: reserva.idReserva,
          motivo: 'Cancelada desde el panel de usuario'
        };

        this.reservationsService.cancelarReserva(request).subscribe({
          next: () => {
            console.log('Reserva cancelada con éxito');
            this.loadData();
          },
          error: (err) => console.error('Error al cancelar:', err)
        });
      }
    });
  }

  handlePageEvent(e: PageEvent): void {
    this.params.pageNumber = e.pageIndex;
    this.params.rowsPerPage = e.pageSize;
    this.loadData();
  }

  onSort(column: string): void {
    const currentSort = this.params.sorts[0];
    let direction: 'ASC' | 'DESC' = 'ASC';

    if (currentSort && currentSort.colName === column) {
      direction = currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
    }

    this.params.sorts = [{ colName: column, direction }];
    this.params.pageNumber = 0;
    this.loadData();
  }

  getSortIcon(column: string): string {
    const sort = this.params.sorts[0];
    if (!sort || sort.colName !== column) {
      return 'uil uil-sort';
    }
    return sort.direction === 'ASC' ? 'uil uil-arrow-up' : 'uil uil-arrow-down';
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
