import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IEmployee } from "../../Interfaces/IEmployee";
import { headerTitleService } from '../../Services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['../editEmployee/star-rating.css'],
})
export class EmployeeComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  //employee object
  employee: any = {};
  constructor(private _employeeService: EmployeeService, private router: Router, private _headerTitleService: headerTitleService) { }

  ngOnInit() {
    this._headerTitleService.setTitle('Employees Home');
    this._headerTitleService.setRoute('');
  }
   countStar(star: any) {
        this.selectedValue = star;
        this.employee.rating = star;
        console.log('Value of star', star, this.stars);
    }
  createEmployee() {
    console.log(this.employee);
    this._employeeService.createEmployee(this.employee)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/main']);
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
