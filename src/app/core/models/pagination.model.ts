export interface SortModel {
  colName: string;
  direction: 'ASC' | 'DESC';
}

export interface FilterModel {
  colName: string;
  value: string;
}

export interface PaginationModel {
  pageNumber: number;
  rowsPerPage: number;
  sorts: SortModel[];
  filters: FilterModel[];
}

// Representa la respuesta PageImpl de Spring
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}