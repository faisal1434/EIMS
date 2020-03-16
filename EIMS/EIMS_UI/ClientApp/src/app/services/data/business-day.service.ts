import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessDay } from 'src/app/models/data/business-day-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessDayService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<BusinessDay[]> {
    return this.http.get<BusinessDay[]>(`${ApiConfig.apiBaseUrl}/api/BusinessDays`);
  }
  post(businessDay: BusinessDay): Observable<BusinessDay> {
    return this.http.post<BusinessDay>(`${ApiConfig.apiBaseUrl}/api/BusinessDays`, businessDay);
  }
  postArray(businessDays: BusinessDay[]): Observable<BusinessDay> {
    return this.http.post<BusinessDay>(`${ApiConfig.apiBaseUrl}/api/BusinessDays/Bulk`, businessDays);
  }
}
