import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/data/teacher-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { ImagePathResponse } from 'src/app/models/view-models/image-path-response-view-model';
import { TeacherExtended } from 'src/app/models/data/teacher-extended-model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${ApiConfig.apiBaseUrl}/api/Teachers`);
  }
  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${ApiConfig.apiBaseUrl}/api/Teachers/${id}`);
  }
  getByIdEx(id: number): Observable<TeacherExtended> {
    return this.http.get<TeacherExtended>(`${ApiConfig.apiBaseUrl}/api/Teachers/Ex/${id}`);
  }
  post(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${ApiConfig.apiBaseUrl}/api/Teachers`, teacher);
  }
  put(teacher: Teacher): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Teachers/${teacher.employeeId}`, teacher);
  }
  delete(teacher: Teacher): Observable<Teacher> {
    return this.http.delete<Teacher>(`${ApiConfig.apiBaseUrl}/api/Teachers/${teacher.employeeId}`);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('file', f);
    console.log(f);
    return this.http.post<ImagePathResponse>(`${ApiConfig.apiBaseUrl}/api/Images/Teacher/${id}`, formData);
  }
}
