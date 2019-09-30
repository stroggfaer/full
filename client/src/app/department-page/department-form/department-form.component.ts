import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from "../../services/department.service";
import {Department} from "../../common/interfaces";
import {switchMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.less']
})

export class DepartmentFormComponent implements OnInit {

    form: FormGroup
    isNew = true
    department: Department

    constructor(private route: ActivatedRoute,
                private departmentService:DepartmentService,
                private router: Router) {
    }

  ngOnInit() {
      this.form = new FormGroup({
          name: new FormControl(null, Validators.required),
          description: new FormControl(null, Validators.required)
      })

     // this.form.disable()
      this.route.params.pipe(switchMap((params: Params) => {
              if (params['id']) {
                  this.isNew = false
                    return this.departmentService.getById(params['id'])
              }
              return of(null)
          })
      ).subscribe((department: Department) => {
                  if (department) {
                      this.department = department
                      this.form.patchValue({
                          name: department.name,
                          description: department.description
                      })
                  }

                  this.form.enable()
              }, error =>alert(error.error.message)
      )

  }

    onSubmit() {
        let obs$
        //this.form.disable()
        const formValue = this.form.value

        if (this.isNew) {
            obs$ = this.departmentService.create(formValue)
        } else {
            obs$ = this.departmentService.update(this.department.id,formValue)
        }
        obs$.subscribe(
            department => {
                this.department = department
                if (this.isNew) {
                    this.router.navigate(['/'])
                }else{
                    this.router.navigate([`/view/${this.department.id}`])
                }
                this.form.enable()
            },
            error => {
                alert(error.error.message);
                this.form.enable()
            }
        )
    }

}
