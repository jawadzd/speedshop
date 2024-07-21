import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { ISignupRequest } from '../models/signup-request.model';
import { ISignupResponse } from '../models/signup-response.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private authUrl = environment.authenticationApi;
  constructor(private http:HttpClient) { }


  signup(request: ISignupRequest):Observable<ISignupResponse>{
 
    return this.http.post<ISignupResponse>(`${this.authUrl}User/SignUp()`, request);
  }
}
