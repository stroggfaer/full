import { Injectable } from '@angular/core';
import {Employee, Message} from "../common/interfaces";
import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {}


    fetch(): Observable<Employee[]> {
        return this.http.get<Employee[]>('/api/employee')
    }

    getById(id: string): Observable<Employee> {
        return this.http.get<Employee>(`/api/employee/${id}`)
    }

    create(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>('/api/employee', employee)
    }

    update(id:number, employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`/api/employee/${id}`, employee)
    }

    delete(id:number): Observable<Message> {
        return this.http.delete<Message>(`/api/employee/${id}`)
    }
}
