import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  constructor(private cookieService: CookieService) { }


  //a function to check if the user is authenticated
  get isAuthenticated(): boolean {
    const tokenExists = this.cookieService.check(this.tokenKey);
    return tokenExists;
  }

  //a function to set the token
  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  //a function to remove the token
  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }
  //a function to get the token
  getToken(): string | null {
    const token = this.cookieService.get(this.tokenKey);
    return token;
  }
}
