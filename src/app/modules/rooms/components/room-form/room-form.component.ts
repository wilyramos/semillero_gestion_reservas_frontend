import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      capacidad: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Detectamos si hay un ID en la URL para saber si es edición
    this.idSala = this.route.snapshot.params['id'];
    if (this.idSala) {
      this.isEditMode = true;
      this.roomsService.getRoomById(this.idSala).subscribe(data => {
        this.roomForm.patchValue(data);
      });
    }
  }

  save(): void {
    if (this.roomForm.invalid) return;

    const salaData = this.roomForm.value;

    if (this.isEditMode && this.idSala) {
      this.roomsService.updateRoom(this.idSala, salaData).subscribe(() => {
        this.router.navigate(['/admin/salas']);
      });
    } else {
      this.roomsService.createRoom(salaData).subscribe(() => {
        this.router.navigate(['/admin/salas']);
      });
    }
  }
}