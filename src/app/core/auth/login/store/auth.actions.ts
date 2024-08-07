import { createAction, props } from '@ngrx/store';
import { ILoginRequest } from '../models/login-request.model';
import { ILoginResponse } from '../models/login-response.model';

//action creators for login, login success, login failure and signout
export const login = createAction(
  '[Auth] Login',//this is the action type should be unique
  props<{ request: ILoginRequest }>()//this is the payload for the action
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: ILoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const signout = createAction(
  '[Auth] Signout'
);