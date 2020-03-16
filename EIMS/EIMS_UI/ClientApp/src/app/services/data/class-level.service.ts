import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassLevel } from 'src/app/models/data/class-level-model';
import { ApiConfig } from 'src/app/configuration/api-config';


@Injectable({
  providedIn: 'root'
})
export class ClassLevelService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${ApiConfig.apiBaseUrl}/api/ClassLevels`)
  }
  getActive(): Observable<ClassLevel[]> {
    return this.http.get<ClassLevel[]>(`${ApiConfig.apiBaseUrl}/api/ClassLevels/Active`)
  }
  postArray(classLevels: ClassLevel[]): Observable<ClassLevel[]> {
    return this.http.post<ClassLevel[]>(`${ApiConfig.apiBaseUrl}/api/ClassLevels/Array`, classLevels);
  }
}
