import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {EmployeeEditComponent} from './Components/editEmployee/employee-edit.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { Routing } from './app-routing';
import { AppComponent } from './app.component';
import {EmployeeService} from './Services/employee.service';
import {HomeComponent} from './Components/home/home.component';
import {EmployeeComponent} from './Components/addEmployee/employee.component';
import {HeaderTitleService} from './Services/title.service';
import { HeaderComponent } from './Components/headerComponent/header.component';
import { FooterComponent } from './Components/footerComponent/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authInterceptorProviders } from './Services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HomeComponent,
    EmployeeEditComponent,
    FilterPipe,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing
  ],
  providers: [EmployeeService,HeaderTitleService,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
