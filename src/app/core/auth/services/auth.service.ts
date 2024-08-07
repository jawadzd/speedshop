import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, signout } from '../login/store/auth.actions';
import { ILoginResponse } from '../login/models/login-response.model';
import { TokenVerificationService } from './token-verification.service';
//auth service to handle the authentication related operations
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly refreshTokenKey = 'refreshToken';

  constructor(
    private cookieService: CookieService,
    private tokenVerificationService: TokenVerificationService,
    private store: Store
  ) {}

  get isAuthenticated(): Observable<boolean> {
    //function to check if the user is authenticated
    const token = this.getToken();
    if (token) {
      if (!this.tokenVerificationService.isTokenExpired(token)) {
        //checking if the token is expired
        return of(true);
      } else {
        return this.refreshToken().pipe(
          //refreshing the token
          map(() => true),
          catchError(() => {
            this.signout();
            return of(false);
          })
        );
      }
    }
    return of(false);
  }
  //function to set the token in the local storage
  setToken(accessToken: string, refreshToken: string): void {
    this.cookieService.set(this.tokenKey, accessToken);
    this.cookieService.set(this.refreshTokenKey, refreshToken);
  }
  //function to remove the token from the local storage
  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.refreshTokenKey);
  }
  //function to get the token from the local storage
  getToken(): string | null {
    const token = this.cookieService.get(this.tokenKey);
    return token || null;
  }
  //function to get the refresh token from the local storage
  getRefreshToken(): string | null {
    const refreshToken = this.cookieService.get(this.refreshTokenKey);
    return refreshToken || null;
  }

  //function to refresh the token using the refresh token after checking if the token is expired via the store and the service
  refreshToken(): Observable<ILoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.tokenVerificationService.refreshToken(refreshToken).pipe(
        map((response) => {
          this.setToken(
            response.Login.AccessToken,
            response.Login.RefreshToken
          );
          this.store.dispatch(loginSuccess({ response }));
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
    //function to signout the user
    this.removeToken();
    this.store.dispatch(signout());
  }
}
