import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { IEmployee } from '../Interfaces/IEmployee';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = environment.baseUrl;

@Injectable()
export class EmployeeService {
    /**
     * Constructor used for injecting services and initializing class variables
     * @param http 
     * @param router
     */
    constructor(private http: HttpClient,
        private router: Router) { }

    /**
     * This function sends a POST request with the given employee object to a REST API for employee creation.
     * @param employee - a json object containing the employee information of type IEmployee
     * @returns `Observable<Object>`
     */
    createEmployee(employee: IEmployee) {
        console.log(employee);
        return this.http.post(baseUrl + 'api/employees', JSON.stringify(employee), httpOptions);
    }

    /**
     * This function sends a GET request to a REST API for retrieving all the employees from the database.
     * @returns `Observable<Object>`
     */
    getAllEmployees() {
        return this.http.get(baseUrl + 'api/employees', httpOptions);
    }

    /**
     * This function sends a PUT request with the given employee object and the id of the employee to a REST API for employee updation.
     * @param employee - a json object containing the employee information of type IEmployee
     * @param employeeId - an integer(number) containing the employee ID.
     * @returns `Observable<Object>`
     */
    updateEmployee(employeeId: number, employee: IEmployee) {

        return this.http.put(baseUrl + `api/employees/${employeeId}`, JSON.stringify(employee), httpOptions);
    }

    /**
     * This function sends a DELETE request with the given employee ID to a REST API for employee deletion.
     * @param employeeId - an integer(number) containing the employee ID.
     * @returns `Observable<Object>`
     */
    deleteEmployee(employeeId: number) {
        return this.http.delete(baseUrl + `api/employees/${employeeId}`, httpOptions);
    }

    /**
     * This function sends a GET request with the given employee ID to a REST API for retrieving the particular Employee Information.
     * @param employeeId - an integer(number) containing the employee ID.
     * @returns `Observable<Object>`
     */
    getEmployeeById(employeeId: number) {
        return this.http.get(baseUrl + `api/employees/${employeeId}`, httpOptions);
    }
}