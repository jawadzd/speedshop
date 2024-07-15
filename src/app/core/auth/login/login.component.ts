import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ILoginRequest } from './models/login-request.model';
import { ILoginResponse } from './models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(request).subscribe((response: ILoginResponse) => {
      console.log(response.Login.AccessToken);


      // if (response && response.Login && response.Login.AccessToken) {
      //   // Handle successful login, e.g., store the token, redirect to another page
      //   console.log('Login successful');
      //   alert('Login successful');
        // localStorage.setItem('token', response.Login.AccessToken);
      //   this.router.navigate(['/']); // Redirect to home page or another route
      // } else {
      //   // Handle login failure
      //   alert('Login failed. Please check your username and password.');
      // }
    }, error => {
      // Handle error response
      alert('An error occurred. Please try again later.');
    });
  }
}
