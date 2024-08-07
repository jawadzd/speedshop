import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../login/models/login-response.model';
import { environment } from '../../../../environments/environment.dev';
//service to verify the token
@Injectable({
  providedIn: 'root',
})
export class TokenVerificationService {
  private refreshUrl = `${environment.authenticationApi}User/RefreshToken()`; //refresh token endpoint

  constructor(private http: HttpClient) {}

  // Decodes the JWT and returns its payload
  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  // Checks if the token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);

    return expirationDate < new Date();
  }

  // Refreshes the token using the refresh endpoint
  refreshToken(refreshToken: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.refreshUrl, { refreshToken });
  }
}
