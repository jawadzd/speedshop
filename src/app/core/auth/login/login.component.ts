import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ILoginRequest } from './models/login-request.model';
import { ILoginResponse } from './models/login-response.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(request).subscribe((response: ILoginResponse) => {
      if (response && response.Login && response.Login.AccessToken) {
        this.authService.setToken(response.Login.AccessToken);
        alert('Login successful');
        this.router.navigate(['/']); // Redirect to home page or another route
      } else {
        alert('Login failed. Please check your username and password.');
      }
    }, error => {
      alert('An error occurred. Please try again later.');
    });
  }
}