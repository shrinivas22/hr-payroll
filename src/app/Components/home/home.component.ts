import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { HeaderTitleService } from '../../Services/title.service';
import { IEmployee } from 'src/app/Interfaces/IEmployee';
import { TokenStorageService } from '../../Services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  noData: boolean = false;
  employees: Array<IEmployee> = [];
  isDataAvailable: boolean = true;
  _id: number = 0;
  searchText: string = "";
  currentUser: any;

  /**
   * Constructor used for injecting services and initializing class variables
   * @param _employeeService 
   * @param router
   * @param _headerTitleService
   */
  constructor(private _employeeService: EmployeeService,
    private router: Router,
    private token: TokenStorageService,
    private _headerTitleService: HeaderTitleService) {
  }


  ngOnInit() {
    this.currentUser = this.token.getUser();
    this._employeeService.getAllEmployees()
      .subscribe(
        (data) => {
          let employeeList: IEmployee[] = Object.values(data);
          this.employees = employeeList;
          if (this.employees.length == 0) {
            this.noData = true;
          }
          // setting isDataAvailable to true after we get the response from the API
          this.isDataAvailable = true;
        },
        (error) => console.log(error)
      );

    // adding title heading on route change
    this._headerTitleService.setTitle('Add Employees');
    // adding title route url on route change
    this._headerTitleService.setRoute('/add');

  }
  /**
   * This function deletes the employee details of the current employee using the passed in employeeid and the
   * employee service
   * @param emp_id
   */
  deleteEmployee(emp_id: number) {
    this._employeeService.deleteEmployee(emp_id)
      .subscribe(
        (data) => {
          if (this.router.url == '/') {
            this.router.navigate(['/main']);
          }
          else if (this.router.url == '/main') {
            this.router.navigate(['/']);
          }
        },
        (error) => console.log(error)
      );
  }
}
