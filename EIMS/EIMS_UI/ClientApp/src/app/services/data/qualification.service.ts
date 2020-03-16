import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Qualification } from 'src/app/models/data/qualification-model';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${ApiConfig.apiBaseUrl}/api/Qualifications`);
  }
  getById(id: number): Observable<Qualification> {
    return this.http.get<Qualification>(`${ApiConfig.apiBaseUrl}/api/Qualifications/${id}`);
  }
  getTeacherQualification(id: number): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${ApiConfig.apiBaseUrl}/api/Qualifications/Teacher/${id}`);
  }
  post(qualification: Qualification): Observable<Qualification> {
    return this.http.post<Qualification>(`${ApiConfig.apiBaseUrl}/api/Qualifications`, qualification);
  }
  put(qualification: Qualification): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Qualifications/${qualification.employeeId}`, qualification);
  }
  delete(qualification: Qualification): Observable<Qualification> {
    return this.http.delete<Qualification>(`${ApiConfig.apiBaseUrl}/api/Qualifications/${qualification.qualificationId}`);
  }
}
