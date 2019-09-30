import { Component, OnInit } from '@angular/core';
import {Department} from "../common/interfaces";
import {Observable} from "rxjs/index";
import {DepartmentService} from "../services/department.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.less']
})

export class DepartmentPageComponent implements OnInit {

    departments$: Observable<Department[]>

    constructor(private departmentService:DepartmentService, private router: Router) {
    }

  ngOnInit() {
      this.departments$ = this.departmentService.fetch()
  }

    deleteDepartment($id) {
        const decision = window.confirm(`Вы уверены, что хотите удалить`)

        if (decision) {
            this.departmentService.delete($id)
                .subscribe(
                    response => console.log(response.message),
                    error =>    alert(error.error.message),
                    () => this.router.navigate(['/'])
                )
        }

    }


}
