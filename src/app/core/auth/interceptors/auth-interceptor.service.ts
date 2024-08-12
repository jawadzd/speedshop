import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
//this is the interceptor that will be used to add the authorization header to the HTTP requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    const authReq = authToken
      ? req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        })
      : req;

    return next.handle(authReq);
  }
}
