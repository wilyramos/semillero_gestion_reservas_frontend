import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../services/admin.service';
import { UsuarioResponse } from '@core/models/usuario.model';
import { PaginationModel } from '@core/models/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '@modules/users/services/user.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  usuarios: UsuarioResponse[] = [];
  totalElements: number = 0;

  params: PaginationModel = {
    pageNumber: 0,
    rowsPerPage: 10,
    sorts: [{ colName: 'idUsuario', direction: 'ASC' }],
    filters: []
  };

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.adminService.getUsuariosPage(this.params).subscribe({
      next: (response) => {
        this.usuarios = response.content;
        this.totalElements = response.totalElements;
      },
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }

  // --- LOGICA DE DIÁLOGOS (CREAR / EDITAR) ---
  
  openUserForm(usuario?: UsuarioResponse): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '450px',
      disableClose: true,
      data: usuario // Si viene usuario es EDITAR, si no es CREAR
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (usuario) {
          this.updateUser(usuario.idUsuario, result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  private createUser(userData: any): void {
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado con éxito', 'Cerrar', { duration: 3000 });
        this.loadData();
      },
      error: (err) => this.showError('Error al crear usuario')
    });
  }

  private updateUser(id: number, userData: any): void {
    this.userService.updateUser(id, userData).subscribe({
      next: () => {
        this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', { duration: 3000 });
        this.loadData();
      },
      error: (err) => this.showError('Error al actualizar usuario')
    });
  }

  // --- LOGICA DE ELIMINAR ---

  onDeleteUser(usuario: UsuarioResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Usuario',
        message: `¿Estás seguro de eliminar al usuario "${usuario.username}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.userService.deleteUser(usuario.idUsuario).subscribe({
          next: () => {
            this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
            this.loadData();
          },
          error: (err) => this.showError('No se pudo eliminar el usuario')
        });
      }
    });
  }

  private showError(msg: string) {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
  }

  handlePageEvent(e: PageEvent): void {
    this.params.pageNumber = e.pageIndex;
    this.params.rowsPerPage = e.pageSize;
    this.loadData();
  }

  onSort(column: string): void {
    const currentSort = this.params.sorts[0];
    let direction: 'ASC' | 'DESC' = (currentSort && currentSort.colName === column && currentSort.direction === 'ASC') ? 'DESC' : 'ASC';
    this.params.sorts = [{ colName: column, direction }];
    this.params.pageNumber = 0;
    this.loadData();
  }

  getSortIcon(column: string): string {
    const sort = this.params.sorts[0];
    if (!sort || sort.colName !== column) return 'uil uil-sort';
    return sort.direction === 'ASC' ? 'uil uil-arrow-up' : 'uil uil-arrow-down';
  }
}