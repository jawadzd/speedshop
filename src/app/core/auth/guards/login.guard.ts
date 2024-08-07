import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 //this authGuard service is used to protect the routes from unauthorized access by checking for the authentication status via auth serivce but this works inversly to the auth service not allowing to go to login or sign up if already logged in 
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/shell/feature']); 
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
