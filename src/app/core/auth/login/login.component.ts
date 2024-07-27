import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { IAuthState } from './store/auth.reducer';
import { ILoginRequest } from './models/login-request.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  username: string = '';
  password: string = '';

  constructor(private store: Store<{ auth: IAuthState }>, private router: Router) {}

  ngOnInit(): void {
    this.store.select(state => state.auth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(authState => {
        if (authState.user && authState.user.Login && authState.user.Login.AccessToken) {
          alert('Login successful');
          this.router.navigate(['/shell/feature/account']);
        } else if (authState.error) {
          alert('Login failed. Please check your username and password.');
        }
      });
  }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.store.dispatch(login({ request: request }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
