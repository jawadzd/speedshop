import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ILoginResponse } from '../models/login-response.model';
import { IAuthState } from '../models/auth-state.model';
//auth reducer to handle the login, login success, login failure and signout actions


export const initialState: IAuthState = {
  user: null,
  error: null,
  loading: false,
};
export const authReducer = createReducer(//creating the reducer using the createReducer function
  initialState,//initial state of the reducer
  on(AuthActions.login, state => ({ ...state, loading: true })),//handling the login action
  on(AuthActions.loginSuccess, (state, { response }) => ({//handling the login success action
    ...state,
    user: response,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({//handling the login failure action
    ...state,
    error,
    loading: false,
  })),
  on(AuthActions.signout, state => ({//handling the signout action
    ...state,
    user: null,
    error: null,
    loading: false,
  }))

);