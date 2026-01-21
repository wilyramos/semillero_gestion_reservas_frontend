import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Reserva } from '@core/models/reserva.model';
import { PaginationModel, SortModel } from '@core/models/pagination.model';

@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent implements OnInit {
  
  reservas: Reserva[] = [];
  totalElements: number = 0;
  totalPages: number = 0;

  // Estado inicial de la paginación
  params: PaginationModel = {
    pageNumber: 0,
    rowsPerPage: 10,
    sorts: [{ colName: 'fechaInicio', direction: 'DESC' }],
    filters: []
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.adminService.getReservasPage(this.params).subscribe({
      next: (response) => {
        this.reservas = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error: (err) => console.error('Error al cargar la página:', err)
    });
  }

  // Cambiar de página
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.params.pageNumber = page;
      this.loadData();
    }
  }

  // Ordenamiento dinámico al hacer clic en cabecera
  onSort(column: string): void {
    const currentSort = this.params.sorts[0];
    let direction: 'ASC' | 'DESC' = 'ASC';

    if (currentSort && currentSort.colName === column) {
      direction = currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
    }

    this.params.sorts = [{ colName: column, direction }];
    this.params.pageNumber = 0; // Reiniciar a la primera página
    this.loadData();
  }

  // Filtrado rápido por estado
  onFilterStatus(event: any): void {
    const value = event.target.value;
    this.params.filters = value ? [{ colName: 'estado', value }] : [];
    this.params.pageNumber = 0;
    this.loadData();
  }
}