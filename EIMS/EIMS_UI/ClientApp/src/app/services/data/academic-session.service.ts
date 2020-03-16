import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicSession } from 'src/app/models/data/academic-session';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class AcademicSessionService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<AcademicSession[]> {
    return this.http.get<AcademicSession[]>(`${ApiConfig.apiBaseUrl}/api/AcademicSessions`);
  }
  getById(id: number): Observable<AcademicSession> {
    return this.http.get<AcademicSession>(`${ApiConfig.apiBaseUrl}/api/AcademicSessions/${id}`);
  }
  getRunning(): Observable<AcademicSession> {
    return this.http.get<AcademicSession>(`${ApiConfig.apiBaseUrl}/api/AcademicSessions/Running`);
  }
  put(academicSession: AcademicSession): Observable<AcademicSession> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/AcademicSessions/${academicSession.academicSessionId}`, academicSession);
  }
  post(academicSession: AcademicSession): Observable<AcademicSession> {
    return this.http.post<AcademicSession>(`${ApiConfig.apiBaseUrl}/api/AcademicSessions`, academicSession);
  }
  delete(id: number): Observable<AcademicSession> {
    return this.http.delete<AcademicSession>(`${ApiConfig.apiBaseUrl}/api/AcademicSessions/${id}`);
  }
}
