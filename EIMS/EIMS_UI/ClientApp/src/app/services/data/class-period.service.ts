import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassPeriodViewModel } from 'src/app/models/view-models/class-period-view-model';
import { retry } from 'rxjs/operators';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class ClassPeriodService {

  constructor(
    private http: HttpClient
  ) { }
  getGenerated(shiftId: number): Observable<ClassPeriodViewModel[]> {
    return this.http.get<ClassPeriodViewModel[]>(`${ApiConfig.apiBaseUrl}/api/ClassPeriods/Generate/${shiftId}`);
  }
  getActive(shiftId: number): Observable<ClassPeriodViewModel[]> {
    
    return this.http.get<ClassPeriodViewModel[]>(`${ApiConfig.apiBaseUrl}/api/ClassPeriods/Shift/${shiftId}`);
  }
  regenerate(shiftId: number): Observable<ClassPeriodViewModel[]> {
    return this.http.get<ClassPeriodViewModel[]>(`${ApiConfig.apiBaseUrl}/api/ClassPeriods/ReGenerate/${shiftId}`);
  }
}
