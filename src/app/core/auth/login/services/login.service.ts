import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../models/login-response.model';
import { ILoginRequest } from '../models/login-request.model';
import { environment } from '../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authUrl = environment.authenticationApi;

  //login service to make the login request to the api 
  constructor(private http:HttpClient) { }

  login(request: ILoginRequest):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(`${this.authUrl}User/Login()`, request);
  }
}
