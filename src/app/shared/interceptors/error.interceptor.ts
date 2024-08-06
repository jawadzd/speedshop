import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (error.status === 500) {
          errorMessage = 'Internal server error. Please try again later.';
        } else if (error.status === 409) {
          errorMessage = 'Email already exists. Please try another email.';
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
        });

        return throwError(error);
      })
    );
  }
}
