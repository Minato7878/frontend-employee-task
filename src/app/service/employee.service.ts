import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants';
import { EmployeeDto } from 'src/app/model/employee.model';
import { EmployeeViewDto } from 'src/app/model/employee.view.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(API_BASE_URL + "/employees");
  }

  getPageableView(filter: string, sortDirection: string, pageNumber: number, pageSize: number): Observable<EmployeeViewDto[]> {
    return this.http.get<EmployeeViewDto[]>(API_BASE_URL + "/employees/view?filter=" + filter
      + "&sortDirection=" + sortDirection + "&page=" + pageNumber + "&size=" + pageSize);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(API_BASE_URL + "/employees/count");
  }

  get(employeeId: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(API_BASE_URL + "/employees/" + employeeId);
  }

  create(employeeDto: EmployeeDto): Observable<EmployeeDto> {
    return this.http.post<EmployeeDto>(API_BASE_URL + "/employees", employeeDto, httpOptions);
  }

  update(employeeDto: EmployeeDto, employeeId: number): Observable<EmployeeDto> {
    return this.http.put<EmployeeDto>(API_BASE_URL + "/employees?employeeId=" + employeeId, employeeDto, httpOptions);
  }

  delete(employeeId: number): Observable<any> {
    return this.http.delete(API_BASE_URL + "/employees/" + employeeId, httpOptions);
  }
}
