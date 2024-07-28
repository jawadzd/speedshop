import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store ,select } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { IAuthState } from './store/auth.reducer';
import { ILoginRequest } from './models/login-request.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectAuthUser, selectAuthError, selectAuthLoading } from './store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  username: string = '';
  password: string = '';

  user$ = this.store.pipe(select(selectAuthUser));
  error$ = this.store.pipe(select(selectAuthError));
  loading$ = this.store.pipe(select(selectAuthLoading));

  constructor(private store: Store<{ auth: IAuthState }>, private router: Router) {}

  ngOnInit(): void {
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && user.Login && user.Login.AccessToken) {
          alert('Login successful');
          this.router.navigate(['/shell/feature/account']);
        }
      });

    this.error$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error) {
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
