import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sala } from '@core/models/sala.model';
import { RoomFormComponent } from '@modules/rooms/components/room-form/room-form.component';
import { RoomsService } from '@modules/rooms/services/rooms.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.css']
})
export class RoomsPageComponent {


  salas: Sala[] = [];

  constructor(private roomsService: RoomsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe(data => this.salas = data);
  }

  deleteRoom(id: number): void {
    // todo: confirmacion en UI modal
    if (confirm('¿Estás seguro de eliminar esta sala?')) {
      this.roomsService.deleteRoom(id).subscribe(() => this.loadRooms());
    }
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(RoomFormComponent, {
        width: '600px'
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadRooms();
        }
      });
    }

  openEditDialog(sala: Sala): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '600px',
      data: sala
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRooms();
      }
    });
  }
}
