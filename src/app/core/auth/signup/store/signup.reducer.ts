import { createReducer ,on } from "@ngrx/store";
import * as SignupActions from "./signup.actions";
import { ISignupResponse } from "../models/signup-response.model";

export interface ISignupState{
    user : ISignupResponse | null;
    error : string | null;
    loading : boolean;
}

export const initialState : ISignupState = {
    user : null,
    error : null,
    loading : false
};

export const signupReducer = createReducer(
    initialState,
    on(SignupActions.signup, state => ({...state, loading : true})),
    on(SignupActions.signupSuccess, (state, {response}) => ({
        ...state,
        user : response,
        loading : false
    })),
    on(SignupActions.signupFailure, (state, {error}) => ({
        ...state,
        erroe : error,
        loading : false
    }))
);
