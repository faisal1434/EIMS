import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/data/subject-model';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${ApiConfig.apiBaseUrl}/api/Subjects`);
  }
  getById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${ApiConfig.apiBaseUrl}/api/Subjects/${id}`);
  }
  post(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${ApiConfig.apiBaseUrl}/api/Subjects`, subject);
  }
  put(subject: Subject): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Subjects/${subject.subjectId}`, subject);
  }
  delete(subject: Subject): Observable<Subject> {
    return this.http.delete<Subject>(`${ApiConfig.apiBaseUrl}/api/Subjects/${subject.subjectId}`);
  }
}
