import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from 'src/app/models/data/designation-model';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Designation[]> {
    return this.http.get<Designation[]>(`${ApiConfig.apiBaseUrl}/api/Designations`);
  }
  getById(id: number): Observable<Designation> {
    return this.http.get<Designation>(`${ApiConfig.apiBaseUrl}/api/Designations/${id}`);
  }
  post(designation: Designation): Observable<Designation> {
    return this.http.post<Designation>(`${ApiConfig.apiBaseUrl}/api/Designations`, designation);
  }
  put(designation: Designation): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Designations/${designation.designationId}`, designation);
  }
  delete(designation: Designation): Observable<Designation> {
    return this.http.delete<Designation>(`${ApiConfig.apiBaseUrl}/api/Designations/${designation.designationId}`);
  }
}
