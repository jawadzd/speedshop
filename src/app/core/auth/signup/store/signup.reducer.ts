import { createReducer, on } from '@ngrx/store';
import * as SignupActions from './signup.actions';
export interface ISignupState {
  user: any;
  error: string | null;
}

const initialState: ISignupState = {
  //initial state
  user: null,
  error: null,
};

export const signupReducer = createReducer(
  //signup reducer
  initialState,
  on(SignupActions.signup, (state) => ({ ...state, loading: true })), //signup action//loading is set to true
  on(SignupActions.signupSuccess, (state, { response }) => ({
    //signup success action//loading is set to false
    ...state,
    user: response,
    loading: false,
  })),
  on(SignupActions.signupFailure, (state, { error }) => ({
    //signup failure action//loading is set to false
    ...state,
    erroe: error,
    loading: false,
  }))
);
