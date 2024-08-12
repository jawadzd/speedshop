import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, signout } from '../login/store/auth.actions';
import { ILoginResponse } from '../login/models/login-response.model';
import { TokenVerificationService } from './token-verification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken'; // Change to authToken
  private readonly refreshTokenKey = 'refreshToken'; // Change to refreshToken

  constructor(
    private cookieService: CookieService,
    private tokenVerificationService: TokenVerificationService,
    private store: Store
  ) {}

  get isAuthenticated(): Observable<boolean> {
    //a function that checks if the user is authenticated
    const token = this.getToken();
    if (token) {
      if (!this.tokenVerificationService.isTokenExpired(token)) {
        //check if the token is expired
        return of(true);
      } else {
        return this.refreshToken().pipe(
          map(() => true),
          catchError(() => {
            this.signout(); ///if the token is expired, sign out the user
            return of(false);
          })
        );
      }
    }
    return of(false);
  }

  setToken(accessToken: string, refreshToken: string): void {
    //a function that sets the token
    this.cookieService.set(this.tokenKey, accessToken);
    this.cookieService.set(this.refreshTokenKey, refreshToken);
  }

  removeToken(): void {
    //a function that removes the token
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.refreshTokenKey);
  }

  getToken(): string | null {
    //a function that gets the token
    const token = this.cookieService.get(this.tokenKey);
    return token || null;
  }

  getRefreshToken(): string | null {
    //a function that gets the refresh token
    const refreshToken = this.cookieService.get(this.refreshTokenKey);
    return refreshToken || null;
  }

  refreshToken(): Observable<ILoginResponse> {
    //a function that refreshes the token
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.tokenVerificationService.refreshToken(refreshToken).pipe(
        map((response) => {
          this.setToken(
            response.Login.AccessToken,
            response.Login.RefreshToken
          );
          this.store.dispatch(loginSuccess({ response })); //dispatch the login success action
          return response;
        }),
        catchError((error) => {
          this.signout();
          return throwError(error);
        })
      );
    }
    return throwError('No refresh token available');
  }

  signout(): void {
    //a function that signs out the user
    this.removeToken();
    this.store.dispatch(signout());
  }

  // New method to get user ID from token
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.tokenVerificationService.decodeToken(token);
      return decoded ? decoded.sub : null;
    }
    return null;
  }
}
