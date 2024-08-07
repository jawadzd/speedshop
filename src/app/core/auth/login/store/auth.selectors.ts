import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../models/auth-state.model';
//creating the feature selector to select the auth state
export const selectAuthState = createFeatureSelector<IAuthState>('auth');

export const selectAuthUser = createSelector(//creating the selector to select the user from the auth state
  selectAuthState,
  (state: IAuthState) => state.user
);

export const selectAuthLoading = createSelector(//creating the selector to select the loading state from the auth state
  selectAuthState,
  (state: IAuthState) => state.loading
);

export const selectAuthError = createSelector(//creating the selector to select the error from the auth state
  selectAuthState,
  (state: IAuthState) => state.error
);