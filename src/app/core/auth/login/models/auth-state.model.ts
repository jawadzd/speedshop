// Object model for the AuthState
import { ILoginResponse } from './login-response.model';
export interface IAuthState {
    user: ILoginResponse | null;
    error: string | null;
    loading: boolean;
  }