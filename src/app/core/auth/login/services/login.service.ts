import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://173.249.40.235:5005/api/User/Login()';

  constructor(private http:HttpClient) { }

  login(username:string,password:string):Observable<any>{


    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {username,password};

    return this.http.post<any>(`${this.loginUrl}`,body,{headers});
  }
}
