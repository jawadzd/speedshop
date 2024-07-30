import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { signout } from '../../login/store/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle token expiration or invalid token
          this.store.dispatch(signout());
        }
        return throwError(error);
      })
    );
  }
}
