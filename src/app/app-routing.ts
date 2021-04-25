import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {EmployeeComponent} from './Components/addEmployee/employee.component';
import {EmployeeEditComponent} from './Components/editEmployee/employee-edit.component';
const routes: Routes = [
{path: '', component : HomeComponent},
{path : 'main' , component : HomeComponent },
{
  path: 'add', component: EmployeeComponent
},
{path : 'main/:employeeId' , component : EmployeeEditComponent },
];
export const Routing = RouterModule.forRoot(routes);



