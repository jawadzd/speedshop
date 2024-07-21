import { Component } from '@angular/core';
import { ISignupRequest } from './models/signup-request.model';
import { ISignupResponse } from './models/signup-response.model';
import { SignupService } from './services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  constructor(private signupService: SignupService, private router: Router) { }

  onSubmit(): void {
    const request: ISignupRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.signupService.signup(request).subscribe((response: ISignupResponse) => {
      if (response && response.id) {
        alert('Signup successful , please login to continue');
        this.router.navigate(['/shell/login']); // Redirect to login page
      } else {
        alert('Signup failed. Please try again.');
      }
    }, error => {
      alert('An error occurred. Please try again later.');
    });

  }




}
