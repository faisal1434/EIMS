import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holiday } from 'src/app/models/data/holiday-model';
import { ApiConfig } from 'src/app/configuration/api-config';
import { HolidayViewModel } from 'src/app/models/view-models/holiday-view-model';
import { CalendarEventViewModel } from 'src/app/models/view-models/calendar-event-view-model';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${ApiConfig.apiBaseUrl}/api/Holidays`);
  }
  getById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${ApiConfig.apiBaseUrl}/api/Holidays/${id}`);
  }
  getViewModel(): Observable<HolidayViewModel[]> {
    return this.http.get<HolidayViewModel[]>(`${ApiConfig.apiBaseUrl}/api/Holidays/Views`);
  }
  getEvents(): Observable<CalendarEventViewModel[]> {
    return this.http.get<CalendarEventViewModel[]>(`${ApiConfig.apiBaseUrl}/api/Holidays/Events`);
  }
  post(holiday: Holiday): Observable<Holiday> {
    return this.http.post < Holiday>(`${ApiConfig.apiBaseUrl}/api/Holidays`, holiday);
  }
  put(holiday: Holiday): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Holidays/${holiday.holidayId}`, holiday);
  }
  delete(holiday: Holiday): Observable<Holiday> {
    return this.http.delete<Holiday>(`${ApiConfig.apiBaseUrl}/api/Holidays/${holiday.holidayId}`);
  }
}
