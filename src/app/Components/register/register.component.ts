import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { IUser } from "../../Interfaces/IUser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  user: IUser = {};
  form: IUser = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  /**
   * This function calls a authentication service which is connected to the POST API for SignUp.
   */
  onSubmit(): void {
    this.user = this.form;

    this.authService.register(this.user).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}