import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstituteInfo } from '../../models/data/institute-info-model';
import { ApiConfig } from '../../configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class InstituteInfoService {

  constructor(private http: HttpClient) { }
  get(): Observable<InstituteInfo[]> {
    return this.http.get<InstituteInfo[]>(`${ApiConfig.apiBaseUrl}/api/InstituteInfoes`);
  }
  getById(id: number): Observable<InstituteInfo> {
    return this.http.get<InstituteInfo>(`${ApiConfig.apiBaseUrl}/api/InstituteInfoes/${id}`)
  }
  post(instituteInfo: InstituteInfo): Observable<InstituteInfo> {
    return this.http.post<InstituteInfo>(`${ApiConfig.apiBaseUrl}/api/InstituteInfoes`, instituteInfo);
  }
  put(instituteInfoId: number, instituteInfo: InstituteInfo) {
    console.log(instituteInfo);
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/InstituteInfoes/${instituteInfoId}`, instituteInfo);
  }
}
