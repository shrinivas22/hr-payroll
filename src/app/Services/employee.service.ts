import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';




const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const baseUrl = environment.baseUrl;

@Injectable()
export class EmployeeService {

    constructor(private http: HttpClient, private router: Router) { }

    createEmployee(employee: any) {
        const body = {
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            phonenumber: employee.phonenumber
            //finalSal: employee.baseSal - employee.medical - employee.tax + employee.bonus
        };
        console.log(employee);

        return this.http.post(baseUrl + 'api/employees', JSON.stringify(employee), httpOptions);

    }

    getAllEmployees() {
        return this.http.get(baseUrl + 'api/employees', httpOptions);
    }

    updateEmployee(id: any, employee: any) {

        return this.http.put(baseUrl + `api/employees/${id}`, JSON.stringify(employee), httpOptions);
    }

    deleteEmployee(id: any) {
        return this.http.delete(baseUrl + `api/employees/${id}`, httpOptions);
    }

    getEmployeeById(id: any) {
        return this.http.get(baseUrl + `api/employees/${id}`, httpOptions);
    }
}