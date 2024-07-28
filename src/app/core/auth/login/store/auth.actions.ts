import { createAction, props } from '@ngrx/store';
import { ILoginRequest } from '../models/login-request.model';
import { ILoginResponse } from '../models/login-response.model';

export const login = createAction(
  '[Auth] Login',
  props<{ request: ILoginRequest }>()
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