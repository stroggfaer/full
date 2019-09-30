import {Component, OnInit,OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Department, Employee} from "../../common/interfaces";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {DepartmentService} from "../../services/department.service";
import {of, Subscription} from "rxjs/index";
import {switchMap} from "rxjs/operators";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.less']
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup
  isNew = true
  employee: Employee
  departments: Department[] = []


  constructor(private route: ActivatedRoute,
                private employeeService:EmployeeService,
                private departmentService:DepartmentService,
                private router: Router) {
  }

  ngOnInit() {

      // Список departments;
      this.departmentService.fetch().subscribe((departments: Department[])=> {
          this.departments = departments
      });

      this.form = new FormGroup({
          department_id: new FormControl(null, Validators.required),
          firstName: new FormControl(null, Validators.required),
          lastName: new FormControl(null, Validators.required)
      })

      // this.form.disable()
      this.route.params.pipe(switchMap((params: Params) => {
              if (params['id']) {
                  this.isNew = false
                  return this.employeeService.getById(params['id'])
              }
              return of(null)
          })
      ).subscribe((employee: Employee) => {
              if (employee) {
                  this.employee = employee
                  this.form.patchValue({
                      department_id: employee.department_id,
                      firstName: employee.firstName,
                      lastName: employee.lastName
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
            obs$ = this.employeeService.create(formValue)
        } else {
            obs$ = this.employeeService.update(this.employee.id,formValue)
        }
        obs$.subscribe(
            employee => {
                this.employee = employee
                if (this.isNew) {
                    this.router.navigate(['/employee'])
                }else{
                    this.router.navigate([`/employee/view/${this.employee.id}`])
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
