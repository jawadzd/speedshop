import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.dev'; 
import { IUserProfile } from '../models/userprofile';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileUrl = `${environment.authenticationApi}User/GetProfile()`;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(this.profileUrl).pipe(
      tap((profile) => console.log('Profile fetched:', profile)),
      catchError((error) => {
        console.error('Error fetching profile:', error);
        throw error;
      })
    );
  }
  
}
