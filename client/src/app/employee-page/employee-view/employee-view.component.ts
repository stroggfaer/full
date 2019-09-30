import {Component, OnDestroy, OnInit} from '@angular/core';
import {of} from "rxjs/index";

import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {Employee} from "../../common/interfaces";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.less']
})
export class EmployeeViewComponent implements OnInit {

    employee: Employee

    constructor(private route: ActivatedRoute,
                private employeeService:EmployeeService) {
    }

     ngOnInit() {

      this.route.params.pipe(switchMap((params: Params) => {
              if (params['id']) {
                  return this.employeeService.getById(params['id'])
              }
              return of(null)
          })
      ).subscribe((employee: Employee) => {
              if (employee) {
                  this.employee = employee
              }else{
                // 404
              }

          }, error =>alert(error.error.message)
      )

  }



}
