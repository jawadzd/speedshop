import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { signup, signupSuccess, signupFailure } from './signup.actions';
import { SignupService } from '../services/signup.service';

@Injectable()
export class SignupEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap((action) =>
        this.signupService.signup(action.request).pipe(
          //call the signup service
          map((response) => signupSuccess({ response: response })), //if the request is successful, dispatch the signup success action
          catchError((error) => of(signupFailure({ error: error.message }))) //if the request fails, dispatch the signup failure action
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private signupService: SignupService
  ) {}
}
