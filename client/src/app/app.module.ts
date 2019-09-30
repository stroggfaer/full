import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsComponent } from './common/layouts/layouts.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DepartmentService} from "./services/department.service";
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeFormComponent } from './employee-page/employee-form/employee-form.component';
import { EmployeeViewComponent } from './employee-page/employee-view/employee-view.component';
import {DepartmentPageComponent} from "./department-page/department-page.component";
import {DepartmentFormComponent} from "./department-page/department-form/department-form.component";
import {DepartmentViewComponent} from "./department-page/department-view/department-view.component";


@NgModule({
  declarations: [
    AppComponent,
    LayoutsComponent,
    DepartmentPageComponent,
    DepartmentFormComponent,
    DepartmentViewComponent,
    EmployeePageComponent,
    EmployeeFormComponent,
    EmployeeViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
