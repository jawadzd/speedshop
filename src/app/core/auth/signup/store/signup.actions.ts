import { createAction, props } from "@ngrx/store";
import { ISignupRequest } from "../models/signup-request.model";
import { ISignupResponse } from "../models/signup-response.model";


export const signup = createAction(
    '[Signup] signup',
    props<{ request: ISignupRequest }>()

);

export const signupSuccess = createAction(
    '[Signup] signup Success',
    props<{ response: ISignupResponse }>()
);

export const signupFailure = createAction(
    '[Signup] signup Failure',
    props<{ error: any }>()
);