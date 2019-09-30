import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './common/layouts/layouts.component'
import {DepartmentPageComponent} from "./department-page/department-page.component";
import {EmployeePageComponent} from "./employee-page/employee-page.component";
import {EmployeeFormComponent} from "./employee-page/employee-form/employee-form.component";
import {EmployeeViewComponent} from "./employee-page/employee-view/employee-view.component";
import {DepartmentFormComponent} from "./department-page/department-form/department-form.component";
import {DepartmentViewComponent} from "./department-page/department-view/department-view.component";

const routes: Routes = [
    {
        path: '', component: LayoutsComponent, children: [
             {path: '', component: DepartmentPageComponent},
             {path: 'create', component: DepartmentFormComponent},
             {path: 'edit/:id', component: DepartmentFormComponent},
             {path: 'view/:id', component: DepartmentViewComponent},

             {path: 'employee', component: EmployeePageComponent},
             {path: 'employee/create', component: EmployeeFormComponent},
             {path: 'employee/edit/:id', component: EmployeeFormComponent},
             {path: 'employee/view/:id', component: EmployeeViewComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
