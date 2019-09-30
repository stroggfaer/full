import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../services/employee.service";
import {Employee} from "../common/interfaces";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.less']
})
export class EmployeePageComponent implements OnInit {

    employeeList$: Observable<Employee[]>

    constructor(private employeeService:EmployeeService, private router: Router) {
    }

  ngOnInit() {
      console.log(this.employeeList$)
      this.employeeList$ = this.employeeService.fetch()

  }

  deleteEmployee($id) {
        const decision = window.confirm(`Вы уверены, что хотите удалить`)

        if (decision) {
            this.employeeService.delete($id)
                .subscribe(
                    response => console.log(response.message),
                    error =>    alert(error.error.message),
                    () => this.router.navigate(['/employee'])
                )
        }
    }

}
