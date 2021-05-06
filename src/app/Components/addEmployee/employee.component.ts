import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';
import { IEmployee } from "../../Interfaces/IEmployee";
import { HeaderTitleService } from '../../Services/title.service';
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
  employee: IEmployee| any = {};
  validationPattern: RegExp  = /^\d{0,1}(\.\d{1,2})?$/;

  /**
   * Constructor used for injecting services and initializing class variables
   * @param _employeeService
   * @param router
   * @param _headerTitleService
   */
  constructor(private _employeeService: EmployeeService,
    private router: Router,
    private _headerTitleService: HeaderTitleService) { }

  ngOnInit() {
    // adding title heading on route change
    this._headerTitleService.setTitle('Employees Home');
    // adding title route url on route change
    this._headerTitleService.setRoute('');
  }

  /**
   * This function accepts the star value based on the index of the star clicked.
   * @param star - number containing the index value to get the value of the rating.
   */
  countStar(star: any) {
    this.selectedValue = star;
    if (this.employee !== undefined)
      this.employee.rating = star;
      
    console.log('Value of star', star, this.stars);
  }
  /**
   * This function is used to format the SSN like NNN-NN-NNNN.
   */
  myPattern() {
    var pattern = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
    if (this.employee != null && this.employee.SSN != null) { 
    var res = pattern.test(this.employee.SSN);
    console.log(this.employee.SSN, res);
    if (!res) {
      this.employee.SSN = this.employee?.SSN?.match(/\d*/g).join('')
        .match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
        .replace(/-*$/g, '');
    }
  }
}
/**
 * This function is used to create a new employee based on the details entered in the form.
 */
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
