import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/data/employee-model';
import { Observable } from 'rxjs';
import { ApiConfig } from 'src/app/configuration/api-config';
import { ImagePathResponse } from 'src/app/models/view-models/image-path-response-view-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }
  get(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${ApiConfig.apiBaseUrl}/api/Employees`);
  }
  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${ApiConfig.apiBaseUrl}/api/Employees/${id}`);
  }
  post(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${ApiConfig.apiBaseUrl}/api/Employees`, employee);
  }
  put(employee: Employee): Observable<any> {
    return this.http.put(`${ApiConfig.apiBaseUrl}/api/Employees/${employee.employeeId}`, employee);
  }
  delete(employee: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${ApiConfig.apiBaseUrl}/api/Employees/${employee.employeeId}`);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('file', f);
    console.log(f);
    return this.http.post<ImagePathResponse>(`${ApiConfig.apiBaseUrl}/api/Images/${id}`, formData);
  }

}
