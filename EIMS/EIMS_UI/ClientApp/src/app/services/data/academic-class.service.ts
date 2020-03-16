import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicClass } from 'src/app/models/data/academic-class-model';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class AcademicClassService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<AcademicClass[]> {
    return this.http.get<AcademicClass[]>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/`);
  }
  getRunnig(): Observable<AcademicClass[]> {
    //console.log('ruuning');
    return this.http.get<AcademicClass[]>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/Running`);
  }
  getById(id: number): Observable<AcademicClass> {
    return this.http.get<AcademicClass>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/${id}`);
  }
  getOfSession(id: number): Observable<AcademicClass[]> {
    return this.http.get<AcademicClass[]>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/Session/${id}`);
  }
  post(academicClass: AcademicClass): Observable<AcademicClass> {
    return this.http.post<AcademicClass>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/`, academicClass);
  }
  put(academicClass: AcademicClass): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/${academicClass.academicClassId}`, academicClass);
  }
  delete(academicClass: AcademicClass): Observable<AcademicClass> {
    return this.http.delete < AcademicClass>(`${ApiConfig.apiBaseUrl}/api/AcademicClasses/${academicClass.academicClassId}`);
  }
}
