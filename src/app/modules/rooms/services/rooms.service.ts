import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../../../core/models/sala.model';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    private readonly apiUrl = 'http://localhost:8080/api/salas';

    constructor(private http: HttpClient) { }

    getRooms(): Observable<Sala[]> {
        console.log('Fetching rooms from API:', this.apiUrl);
        return this.http.get<Sala[]>(this.apiUrl);
    }

    getRoomById(id: number): Observable<Sala> {
        return this.http.get<Sala>(`${this.apiUrl}/${id}`);
    }

    createRoom(sala: Sala): Observable<Sala> {
        return this.http.post<Sala>(this.apiUrl, sala);
    }

    updateRoom(id: number, sala: Sala): Observable<Sala> {
        return this.http.put<Sala>(`${this.apiUrl}/${id}`, sala);
    }

    deleteRoom(id: number): Observable<Sala> {
        return this.http.delete<Sala>(`${this.apiUrl}/${id}`);
    }
}