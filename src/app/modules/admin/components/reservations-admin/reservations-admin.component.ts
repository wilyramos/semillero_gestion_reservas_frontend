import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { Reserva, CancelarReservaRequest } from '@core/models/reserva.model';
import { FilterModel, PaginationModel, SortModel } from '@core/models/pagination.model';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent implements OnInit {

  reservas: Reserva[] = [];
  totalElements: number = 0;
  fechaDesde: string = '';
  fechaHasta: string = '';
  estadoSelected: string = '';

  params: PaginationModel = {
    pageNumber: 0,
    rowsPerPage: 10,
    sorts: [{ colName: 'fechaInicio', direction: 'DESC' }],
    filters: []
  };

  constructor(
    private adminService: AdminService,
    private reservationsService: ReservationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.adminService.getReservasPage(this.params).subscribe({
      next: (response) => {
        this.reservas = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Error al cargar la página:', err)
    });
  }

  // Lógica de cancelación con Modal de Confirmación
  onCancelReserva(reserva: Reserva): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancelar Reserva',
        message: `¿Está seguro que desea cancelar la reserva #${reserva.idReserva} para la ${reserva.nombreSala}?`,
        confirmText: 'Sí, cancelar',
        cancelText: 'No, mantener'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const request: CancelarReservaRequest = {
          idReserva: reserva.idReserva,
          motivo: 'Cancelado por el administrador'
        };

        this.reservationsService.cancelarReserva(request).subscribe({
          next: () => {
            console.log('Reserva cancelada con éxito');
            this.loadData(); // Recargamos la tabla para ver el cambio de estado
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

  onFilter(): void {
    const newFilters: FilterModel[] = [];

    // Filtro de Estado
    if (this.estadoSelected) {
      newFilters.push({ colName: 'estado', value: this.estadoSelected });
    }

    // Filtro Fecha Inicio
    if (this.fechaDesde) {
      newFilters.push({ colName: 'fechaInicio', value: this.fechaDesde });
    }

    // Filtro Fecha Fin
    if (this.fechaHasta) {
      newFilters.push({ colName: 'fechaFin', value: this.fechaHasta });
    }

    this.params.filters = newFilters;
    this.params.pageNumber = 0; //
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

  onFilterStatus(event: any): void {
    const value = event.target.value;
    this.params.filters = value ? [{ colName: 'estado', value }] : [];
    this.params.pageNumber = 0;
    this.loadData();
  }

  resetFilters(): void {
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.estadoSelected = '';
    this.params.filters = [];
    this.params.pageNumber = 0;
    this.loadData();
  }
}