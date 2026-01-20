import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sala } from '@core/models/sala.model';
import { RoomsService } from '@modules/rooms/services/rooms.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  roomForm: FormGroup;
  isEditMode: boolean = false;
  idSala?: number;

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RoomFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Sala
  ) {
    this.roomForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      capacidad: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.idSala) {
      this.isEditMode = true;
      this.idSala = this.data.idSala;
      this.roomForm.patchValue(this.data);
    }
  }

  save(): void {
    if (this.roomForm.invalid) return;

    const salaData = this.roomForm.value;

    if (this.isEditMode && this.idSala) {
      this.roomsService.updateRoom(this.idSala, salaData).subscribe({
        next: (response) => {
          this.snackBar.open('Sala actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          const errorMessage = error.error?.error || 'Error al actualizar la sala';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    } else {
      this.roomsService.createRoom(salaData).subscribe({
        next: (response) => {
          this.snackBar.open('Sala creada exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.dialogRef.close(response);
        },
        error: (error) => {
          const errorMessage = error.error?.error || 'Error al crear la sala';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    }
  }
}
