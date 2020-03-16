import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from 'src/app/models/data/section-model';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/app/configuration/api-config';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Section[]> {
    return this.http.get<Section[]>(`${ApiConfig.apiBaseUrl}/api/Sections`);
  }
  getEx(): Observable<Section[]> {
    return this.http.get<Section[]>(`${ApiConfig.apiBaseUrl}/api/Sections/Ex`);
  }
  getById(id: number): Observable<Section> {
    return this.http.get<Section>(`${ApiConfig.apiBaseUrl}/api/Sections/${id}`);
  }
  post(section: Section): Observable<Section> {
    return this.http.post<Section>(`${ApiConfig.apiBaseUrl}/api/Sections`, section);
  }
  put(section: Section): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Sections/${section.sectionId}`, section);
  }
  delete(section: Section): Observable<Section> {
    return this.http.delete<Section>(`${ApiConfig.apiBaseUrl}/api/Sections/${section.sectionId}`);
  }
}
