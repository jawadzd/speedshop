import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISignupState } from './signup.reducer';

export const selectSignupState = createFeatureSelector<ISignupState>('signup');

export const selectSignupUser = createSelector(
  //create the selector to get the user
  selectSignupState,
  (state: ISignupState) => state.user
);
export const selectSignupError = createSelector(
  //create the selector to get the error
  selectSignupState,
  (state: ISignupState) => state.error
);
