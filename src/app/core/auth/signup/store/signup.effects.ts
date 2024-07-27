import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SignupService } from '../services/signup.service';
import { signup, signupSuccess, signupFailure } from './signup.actions';



@Injectable()
export class SignupEffects {
  constructor(
    private actions$: Actions,
    private signupService: SignupService
  ) {}

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(action =>
        this.signupService.signup(action.request).pipe(
          map(response => signupSuccess({ response })),
          catchError(error => of(signupFailure({ error })))
        )
      )
    )
  );
}