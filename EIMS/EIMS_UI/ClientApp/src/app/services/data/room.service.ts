import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from 'src/app/models/data/room-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { SuccessResponse } from 'src/app/models/common/success-response-model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${ApiConfig.apiBaseUrl}/api/Rooms`);
  }
  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${ApiConfig.apiBaseUrl}/api/Rooms/${id}`);
  }
  post(room: Room): Observable<Room> {
    return this.http.post<Room>(`${ApiConfig.apiBaseUrl}/api/Rooms`, room);
  }
  put(room: Room): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Rooms/${room.roomId}`, room);
  }
  delete(room: Room): Observable<Room> {
    return this.http.delete < Room>(`${ApiConfig.apiBaseUrl}/api/Rooms/${room.roomId}`);
  }
  roomNoCheck(roomNo: string): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${ApiConfig.apiBaseUrl}/api/Rooms/Exists/${roomNo}`);
  }
}
