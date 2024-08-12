import { createAction, props } from '@ngrx/store';
import { ISignupRequest } from '../models/signup-request.model';
import { ISignupResponse } from '../models/signup-response.model';

//create the signup action
export const signup = createAction(
  '[Signup] signup',
  props<{ request: ISignupRequest }>()
);
//create the signup success action
export const signupSuccess = createAction(
  '[Signup] signup Success',
  props<{ response: ISignupResponse }>()
);
//create the signup failure action
export const signupFailure = createAction(
  '[Signup] signup Failure',
  props<{ error: any }>()
);
