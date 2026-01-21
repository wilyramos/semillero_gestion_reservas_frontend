
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { RoomsService } from '@modules/rooms/services/rooms.service';
import { Sala } from '@core/models/sala.model';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {

  roomForm: FormGroup;
  salas: Sala[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReservationFormComponent>,
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private roomsService: RoomsService,
    private dialog: MatDialog
  ) {
    this.roomForm = this.fb.group({
      idSala: [null, [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required, this.validarFechaFin.bind(this)]],
    });

    // Revalidar fechaFin cuando cambie fechaInicio
    this.roomForm.get('fechaInicio')?.valueChanges.subscribe(() => {
      this.roomForm.get('fechaFin')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.cargarSalas();
  }

  // Validador personalizado para el campo fechaFin
  validarFechaFin(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const fechaInicio = this.roomForm?.get('fechaInicio')?.value;
    if (!fechaInicio) {
      return null;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(control.value);

    return fin > inicio ? null : { fechaInvalida: true };
  }

  cargarSalas(): void {
    this.roomsService.getRooms().subscribe({
      next: (salas) => {
        this.salas = salas;
        console.log('Salas cargadas:', salas);
      },
      error: (error) => {
        console.error('Error al cargar las salas:', error);
        this.snackBar.open('Error al cargar las salas', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  save(): void {
    if (this.roomForm.invalid) return;

    const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Reserva',
        message: '¿Está seguro de que desea crear esta reserva?',
        confirmText: 'Sí, crear',
        cancelText: 'Cancelar'
      }
    });

    confirmDialogRef.afterClosed().subscribe(result => {
      if (!result) return; // Si no confirma, no hacer nada

      const idUsuario = this.authService.getUserId();

      const reservaData = {
        ...this.roomForm.value,
        idUsuario: idUsuario
      };

      console.log('Datos de reserva a enviar:', reservaData);

      this.reservationsService.crearReserva(reservaData).subscribe({
        next: (response) => {
          console.log('Reserva creada exitosamente:', response);
          this.snackBar.open('Reserva creada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error al crear la reserva:', error);
          const errorMessage = error.error?.error || error.error?.message || 'Error al crear la reserva. Por favor, revise los datos e intente nuevamente.';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    });
  }
}
