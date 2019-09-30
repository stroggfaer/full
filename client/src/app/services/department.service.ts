import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department,Message} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

    constructor(private http: HttpClient) {}


    fetch(): Observable<Department[]> {
        return this.http.get<Department[]>('/api/department')
    }

    getById(id: string): Observable<Department> {
        return this.http.get<Department>(`/api/department/${id}`)
    }

    create(department: Department): Observable<Department> {
        return this.http.post<Department>('/api/department', department)
    }

    update(id:number, department: Department): Observable<Department> {
        return this.http.put<Department>(`/api/department/${id}`, department)
    }

    delete(id:number): Observable<Message> {
        return this.http.delete<Message>(`/api/department/${id}`)
    }

}
