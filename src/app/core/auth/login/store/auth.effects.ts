import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure, signout } from './auth.actions';
//this is the effect class for the auth module which is used to handle the side effects of the actions
@Injectable()//injectable decorator to inject the service into the module 
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
            this.authService.setToken(response.Login.AccessToken, response.Login.RefreshToken);//setting the token in the local storage
            return loginSuccess({ response });//returning the login success action
          }),
          catchError(error => of(loginFailure({ error })))//returning the login failure action
          //some errors are handled here on this level and some are handled by the interceptor
        )
      )
    )
  );

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signout),
      map(() => {
        this.authService.removeToken();
        return { type: '[Auth] Signout Success' }; //returning the signout success action
      })
    )
  );

  autoLogin$ = createEffect(() =>//effect to auto login the user if the token is present in the local storage
    this.actions$.pipe(
      ofType('[Auth] Auto Login'),
      switchMap(() => this.authService.isAuthenticated.pipe(
        map(isAuthenticated => {
          if (isAuthenticated) {
            return { type: '[Auth] Auto Login Success' };//returning the auto login success action
          } else {
            return { type: '[Auth] Auto Login Failure' };
          }
        })
      ))
    )
  );
}
