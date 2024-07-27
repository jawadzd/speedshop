import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { signup, signupSuccess, signupFailure } from './signup.actions';
import { SignupService } from '../services/signup.service';

@Injectable()
export class SignupEffects {
  signup$ = createEffect(() => this.actions$.pipe(
    ofType(signup),
    mergeMap(action =>
      this.signupService.signup(action.request).pipe(
        map(response => signupSuccess({ response: response })),
        catchError(error => of(signupFailure({ error: error.message })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private signupService: SignupService
  ) {}
}
