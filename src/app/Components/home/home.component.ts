import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { headerTitleService } from '../../Services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noData: boolean = false;
  employees: any = [];
  isDataAvailable:boolean=true;
  _id: string = "";
  searchText: string = '';
  constructor(private _employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute, private _headerTitleService: headerTitleService) { 
    
  }


  ngOnInit() {
    this._employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          console.log(data);
          this.employees = data;
          if (this.employees.length == 0) {
            this.noData = true;
            console.log(this.noData);
          }
          console.log(this.noData)
          console.log(this.isDataAvailable);
          this.isDataAvailable=true;
          console.log(this.isDataAvailable)
          console.log(this.employees.length);
        },
        (error) => console.log(error)
      );

    

    this._headerTitleService.setTitle('Add Employees');
    this._headerTitleService.setRoute('/add');

  }

  deleteEmployee(emp_id: any, i: any) {
    console.log(this._id, '----------->', emp_id);
    this._employeeService.deleteEmployee(emp_id)
      .subscribe(
        (data: any) => {
          console.log(data);
          if (this.router.url == '/')
          {
            this.router.navigate(['/main']);
          }
          else if (this.router.url == '/main'){
            this.router.navigate(['/']);
          }
          //window.location.reload();
        },
        (error) => console.log(error)
      );
  }
}
