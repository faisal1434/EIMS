import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeacherSubject } from 'src/app/models/data/teacher-subject';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/app/configuration/api-config';
import { TeacherSubjectViewModel } from 'src/app/models/view-models/teacher-subject-view-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherSubjectService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<TeacherSubject[]> {
    return this.http.get<TeacherSubject[]>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects`);
  }
  getEx(): Observable<TeacherSubjectViewModel[]> {
    return this.http.get<TeacherSubjectViewModel[]>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects/Ex`);
  }
  getById(id: number): Observable<TeacherSubject> {
    return this.http.get<TeacherSubject>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects/${id}`);
  }
  getByIdEx(id: number): Observable<TeacherSubject[]> {
    return this.http.get<TeacherSubject[]>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects/Teacher/${id}`);
  }
  getByIdExWithAll(id: number): Observable<TeacherSubject[]> {
    return this.http.get<TeacherSubject[]>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects/Teacher/Ex/${id}`);
  }
  post(ts: TeacherSubject): Observable<TeacherSubject> {
    return this.http.post<TeacherSubject>(`${ApiConfig.apiBaseUrl}/api/TeacherSubjects`, ts);
  }
  put(ts: TeacherSubject): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Teachers/${ts.employeeId}`, ts);
  }
  delete(ts: TeacherSubject): Observable<TeacherSubject> {
    return this.http.delete<TeacherSubject>(`${ApiConfig.apiBaseUrl}/api/Teachers/${ts.employeeId}`);
  }
}
