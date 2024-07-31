import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure, signout } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(action =>
        this.loginService.login(action.request).pipe(
          map(response => {
            this.authService.setToken(response.Login.AccessToken, response.Login.RefreshToken);
            return loginSuccess({ response });
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      map(() => {
        this.authService.removeToken();
        return { type: '[Auth] Signout Success' }; 
      })
    )
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Auth] Auto Login'),
      switchMap(() => this.authService.isAuthenticated.pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            return { type: '[Auth] Auto Login Success' };
          } else {
            return { type: '[Auth] Auto Login Failure' };
          }
        })
      ))
    )
  );
}
