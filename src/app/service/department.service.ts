import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants';
import { DepartmentDto } from '../model/department.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(API_BASE_URL + "/departments");
  }

  get(departmentId: number): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(API_BASE_URL + "/departments/" + departmentId);
  }

  create(departmentDto: DepartmentDto): Observable<DepartmentDto> {
    return this.http.post<DepartmentDto>(API_BASE_URL + "/departments", departmentDto, httpOptions);
  }

  update(departmentDto: DepartmentDto, departmentId: number): Observable<DepartmentDto> {
    return this.http.post<DepartmentDto>(API_BASE_URL + "/departments?departmentId=" + departmentId, departmentDto, httpOptions);
  }

  delete(departmentId: number): void {
    this.http.delete(API_BASE_URL + "/departments/" + departmentId);
  }
}
