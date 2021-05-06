import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICredentials } from '../Interfaces/ICredentials';
import { IUser } from '../Interfaces/IUser';
import { Observable } from 'rxjs';

const AUTH_API = environment.baseUrl + 'api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    constructor(private http: HttpClient) { }
    /**
    * This function sends a POST request to a REST API for checking if the user details entered matched.
    * @returns `Observable<any>`
    */
    login(credentials: ICredentials): Observable<any> {
        return this.http.post(AUTH_API + 'signin', {
            username: credentials.username,
            password: credentials.password
        }, httpOptions);
    }
    /**
     * This function sends a POST request to a REST API for creating a new user.
     * @returns `Observable<any>`
     */
    register(user: IUser): Observable<any> {
        return this.http.post(AUTH_API + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password
        }, httpOptions);
    }
}