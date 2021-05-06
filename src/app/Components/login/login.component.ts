import { Component, OnInit } from '@angular/core';
import { ICredentials } from 'src/app/Interfaces/ICredentials';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

import { TokenStorageService } from '../../Services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: ICredentials = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService,
        private router: Router,
        private tokenStorage: TokenStorageService) { }

    ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
        }
    }
    /**
      * This function call a authentication service which is connected to the POST API for login
      */

    onSubmit(): void {
        const creds = this.form;

        this.authService.login(creds).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.reloadPage();
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }
    /**
      * This function to be called for page reload
      */
    reloadPage(): void {
        window.location.reload();
    }
}