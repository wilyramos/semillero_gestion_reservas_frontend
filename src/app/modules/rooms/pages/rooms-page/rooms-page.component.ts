import { Component } from '@angular/core';
import { Sala } from '@core/models/sala.model';
import { RoomsService } from '@modules/rooms/services/rooms.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.css']
})
export class RoomsPageComponent {


  salas: Sala[] = [];

  constructor(private roomsService: RoomsService) { }

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
}