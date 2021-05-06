import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/IUser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    private userSubject: BehaviorSubject<IUser>;
    public user: Observable<IUser>;

    constructor(private router: Router) {
        let userVal = window.sessionStorage.getItem(USER_KEY)!;
        // creating a Behaviour Subject to broadcast the updated user object wherever required.
        this.userSubject = new BehaviorSubject<IUser>(JSON.parse(userVal));
        this.user = this.userSubject.asObservable();

    }
    /**
    * This function is used to perform signout by clearing out the token from the session storage.
    */
    signOut(): void {
        window.sessionStorage.clear();
        this.userSubject.next({});
        this.router.navigate(['/login']);
    }
    /**
    * This function is used to save the auth token passed in through the parameteres 
    * to the session storage under the `auth-token` key.
    * @param token.
    */
    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }
    /**
    * This function is used to get the save token string.
    * @returns `string | null`
    */

    public getToken(): string | null {
        return sessionStorage.getItem(TOKEN_KEY);
    }
    /**
    * This function returns the updated user value which is of type BehaviourSubject
    * @returns `IUser`
    */
    public get userValue(): IUser {
        return this.userSubject.value;
    }
    /**
    * This function is used to save the user details passed in through the parameteres 
    * to the session storage under the `auth-user` key.
    * @param user
    */
    public saveUser(user: IUser): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        this.userSubject.next(user);
    }
    /**
    * This function is used to get the save user.
    */
    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}