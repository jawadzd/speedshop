import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { TokenVerificationService } from './token-verification.service';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { loginSuccess, signout } from '../login/store/auth.actions';
import { ILoginResponse } from '../login/models/login-response.model';

@Injectable({
  providedIn: 'root'
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
    const token = this.getToken();
    if (token) {
      return this.tokenVerificationService.verifyToken(token).pipe(
        switchMap(response => {
          if (response.valid) {
            return of(true);
          } else {
            return this.refreshToken().pipe(
              map(() => true),
              catchError(() => {
                this.signout();
                return of(false);
              })
            );
          }
        }),
        catchError(() => {
          this.signout();
          return of(false);
        })
      );
    }
    return of(false);
  }

  setToken(accessToken: string, refreshToken: string): void {
    this.cookieService.set(this.tokenKey, accessToken);
    this.cookieService.set(this.refreshTokenKey, refreshToken);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
    this.cookieService.delete(this.refreshTokenKey);
  }

  getToken(): string | null {
    const token = this.cookieService.get(this.tokenKey);
    return token || null;
  }

  getRefreshToken(): string | null {
    const refreshToken = this.cookieService.get(this.refreshTokenKey);
    return refreshToken || null;
  }

  refreshToken(): Observable<ILoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.tokenVerificationService.refreshToken(refreshToken).pipe(
        map(response => {
          this.setToken(response.Login.AccessToken, response.Login.RefreshToken);
          this.store.dispatch(loginSuccess({ response }));
          return response;
        }),
        catchError(error => {
          this.signout();
          return throwError(error);
        })
      );
    }
    return throwError('No refresh token available');
  }

  signout(): void {
    this.removeToken();
    this.store.dispatch(signout());
  }
}
