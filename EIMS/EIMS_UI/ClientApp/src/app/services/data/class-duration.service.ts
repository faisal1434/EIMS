import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/app/configuration/api-config';
import { ClassDuration } from 'src/app/models/data/class-duration-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassDurationService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<ClassDuration[]> {
    return this.http.get<ClassDuration[]>(`${ApiConfig.apiBaseUrl}/api/ClassDurations`);
  }
  postArray(classDurations: ClassDuration[]): Observable<ClassDuration[]> {
    return this.http.post<ClassDuration[]>(`${ApiConfig.apiBaseUrl}/api/ClassDurations/Bulk`, classDurations);
  }
}
