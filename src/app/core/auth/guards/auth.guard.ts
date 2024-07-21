import { CanActivate, CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import{ Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {

      this.router.navigate(['/shell/feature']);
      return false;
    }
    return true;
  }
}
