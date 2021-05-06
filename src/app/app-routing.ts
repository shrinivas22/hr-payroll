import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { EmployeeComponent } from './Components/addEmployee/employee.component';
import { EmployeeEditComponent } from './Components/editEmployee/employee-edit.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent , canActivate: [AuthGuard]  },
  { path: 'main', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'add', component: EmployeeComponent , canActivate: [AuthGuard] },
  { path: 'main/:employeeId', component: EmployeeEditComponent , canActivate: [AuthGuard] },
];
export const Routing = RouterModule.forRoot(routes);



