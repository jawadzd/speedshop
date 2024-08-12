import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { signout } from '../login/store/auth.actions';
//this is the error interceptor that will be used to intercept the HTTP requests and handle the errors
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage =
          'An unexpected error occurred. Please try again later.';

        switch (error.status) {
          case 500:
            errorMessage = 'Internal server error. Please try again later.';
            break;
          case 409:
            errorMessage = 'Email already exists. Please try another email.';
            break;
          case 401:
            this.store.dispatch(signout());
            errorMessage = 'Unauthorized access, please log in again.';
            break;
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
        });

        return throwError(() => error);
      })
    );
  }
}
