import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HeaderTitleService } from '../../Services/title.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IEmployee } from 'src/app/Interfaces/IEmployee';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./star-rating.css'],
})
export class EmployeeEditComponent implements OnInit {

    employee: IEmployee = {};
    _id: number = 0;
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;
    rating: number | undefined = 0;
    validationPattern: RegExp = /^\d{0,1}(\.\d{1,2})?$/;

    /**
    * Constructor used for injecting services and initializing class variables
    * @param _employeeService 
    * @param activatedRoute
    * @param router
    * @param _headerTitleService
    */
    constructor(private activatedRoute: ActivatedRoute, private _employeeService: EmployeeService,
        private router: Router, private _headerTitleService: HeaderTitleService) {

    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this._id = params['employeeId'];
            console.log(this._id);
            console.log('Above is the id');
            this._employeeService.getEmployeeById(this._id)
                .subscribe(
                    (data) => {
                        //setting employee data of the selected employee.
                        this.employee = data;
                        this.rating = this.employee != null ? this.employee.rating : 0;
                    },
                    (error) => console.log(error)
                );
        });
        // adding title heading on route change
        this._headerTitleService.setTitle('Employees Home');
        // adding title route url on route change
        this._headerTitleService.setRoute('');

    }
    /**
     * This function accepts the star value based on the index of the star clicked.
     * @param star - number containing the index value to get the value of the rating.
     */
    countStar(star: number) {
        this.selectedValue = star;
        this.employee.rating = star;
        console.log('Value of star', star, this.stars);
    }
    /**
     * This function updates the employee details of the current employee using the 
     * employee service
     */
    updateEmployee() {
        this._employeeService.updateEmployee(this._id, this.employee)
            .subscribe(
                (data) => {
                    console.log('I am in update employee');
                    this.router.navigate(['/main'])
                },
                (error) => console.log(error));

    }

}