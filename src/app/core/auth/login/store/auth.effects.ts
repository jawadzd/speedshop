import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure } from './auth.actions';

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
            this.authService.setToken(response.Login.AccessToken);
            return loginSuccess({ response });
          }),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );
}
