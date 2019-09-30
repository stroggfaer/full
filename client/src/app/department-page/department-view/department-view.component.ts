import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Department} from "../../common/interfaces";
import {DepartmentService} from "../../services/department.service";
import {of} from "rxjs/index";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.less']
})
export class DepartmentViewComponent implements OnInit {

    department: Department

    constructor(private route: ActivatedRoute,
                private departmentService:DepartmentService) {
    }

  ngOnInit() {

      this.route.params.pipe(switchMap((params: Params) => {
              if (params['id']) {
                  return this.departmentService.getById(params['id'])
              }
             return of(null)
          })
      ).subscribe((department: Department) => {
              if (department) {
                  this.department = department
              }else{
                  alert('AD');
              }

          }, error =>alert(error.error.message)
      )
  }

}
