import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

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
    this.loginService.login(this.username, this.password).subscribe(response => {
      if (response && response.Login && response.Login.AccessToken) {
        // Handle successful login, e.g., store the token, redirect to another page
        console.log('Login successful');
        alert('Login successful');
        localStorage.setItem('token', response.Login.AccessToken);
        this.router.navigate(['/']); // Redirect to home page or another route
      } else {
        // Handle login failure
        alert('Login failed. Please check your username and password.');
      }
    }, error => {
      // Handle error response
      alert('An error occurred. Please try again later.');
    });
  }
}
