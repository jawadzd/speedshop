import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { AuthState } from './store/auth.reducer';
import { ILoginRequest } from './models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) { }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.store.dispatch(login({ request: request }));

    this.store.select(state => state.auth).subscribe(authState => {
      if (authState.user && authState.user.Login && authState.user.Login.AccessToken) {
        alert('Login successful');
        this.router.navigate(['/shell/feature/account']); // Redirect to home page or another route
      } else if (authState.error) {
        alert('Login failed. Please check your username and password.');
      }
    });
  }
}
