import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShiftViewModel } from 'src/app/models/view-models/shift-view-model';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor(
    private http: HttpClient
  ) { }
  getV1(): Observable<ShiftViewModel[]> {
    return this.http.get<ShiftViewModel[]>(`${ApiConfig.apiBaseUrl}/api/Shifts/V1`);
    
  }
  getV1Active(): Observable<ShiftViewModel[]> {
    return this.http.get<ShiftViewModel[]>(`${ApiConfig.apiBaseUrl}/api/Shifts/V1/Active`);

  }
  postArray(shifts: ShiftViewModel[]): Observable<ShiftViewModel[]> {
    return this.http.post<ShiftViewModel[]>(`${ApiConfig.apiBaseUrl}/api/Shifts/V1`, shifts);
  }
}
