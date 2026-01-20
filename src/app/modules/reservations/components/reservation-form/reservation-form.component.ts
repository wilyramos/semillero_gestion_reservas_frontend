
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationsService } from '@modules/reservations/services/reservations.service';
import { AuthService } from '@modules/auth/services/auth.service';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent {

  roomForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReservationFormComponent>,
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.roomForm = this.fb.group({
      idSala: [null, [Validators.required]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]],
    });
  }

  save(): void {
    if (this.roomForm.invalid) return;

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
          verticalPosition: 'top',
        });
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Error al crear la reserva:', error);
        const errorMessage = error.error?.error || error.error?.message || 'Error al crear la reserva. Por favor, revise los datos e intente nuevamente.';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });

  }
}
