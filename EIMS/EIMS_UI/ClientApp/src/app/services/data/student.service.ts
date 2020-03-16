import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from 'src/app/models/data/student-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { Observable } from 'rxjs';
import { ImagePathResponse } from 'src/app/models/view-models/image-path-response-view-model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Student[]> {
    return this.http.get<Student[]>(`${ApiConfig.apiBaseUrl}/api/Students`);
  }
  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${ApiConfig.apiBaseUrl}/api/Students/${id}`);
  }
  post(student: Student): Observable<Student> {
    return this.http.post<Student>(`${ApiConfig.apiBaseUrl}/api/Students`, student);
  }
  put(student: Student): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Students/${student.studentId}`, student);
  }
  delete(student: Student): Observable<Student> {
    return this.http.delete<Student>(`${ApiConfig.apiBaseUrl}/api/Students/${student.studentId}`);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('file', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${ApiConfig.apiBaseUrl}/api/Images/Student/${id}`, formData);
  }
}
