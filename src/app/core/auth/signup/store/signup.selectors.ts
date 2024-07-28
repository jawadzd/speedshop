
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISignupState } from './signup.reducer';

export const selectSignupState = createFeatureSelector<ISignupState>('signup');

export const selectSignupUser = createSelector(
  selectSignupState,
  (state: ISignupState) => state.user
);
export const selectSignupError = createSelector(
  selectSignupState,
  (state: ISignupState) => state.error
);
