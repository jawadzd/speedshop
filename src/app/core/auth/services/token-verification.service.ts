import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../login/models/login-response.model';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class TokenVerificationService {
  private verifyUrl = `${environment.authenticationApi}User/VerifyToken`;
  private refreshUrl = `${environment.authenticationApi}User/RefreshToken`;

  constructor(private http: HttpClient) {}

  verifyToken(token: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(this.verifyUrl, { token });
  }

  refreshToken(refreshToken: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.refreshUrl, { refreshToken });
  }
}
