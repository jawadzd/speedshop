import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ILoginResponse } from '../models/login-response.model';

export interface IAuthState {
  user: ILoginResponse | null;
  error: string | null;
  loading: boolean;
}

export const initialState: IAuthState = {
  user: null,
  error: null,
  loading: false,
};
export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.signout, state => ({
    ...state,
    user: null,
    error: null,
    loading: false,
  }))

);