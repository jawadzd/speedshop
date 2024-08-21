import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
import { IUserProfile } from '../models/userprofile-model';

//this is the service that will be used to fetch the user profile from the API
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileUrl = `${environment.authenticationApi}User/GetProfile()`;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(this.profileUrl).pipe(
      catchError((error) => {
        console.error('Error fetching profile:', error);
        throw error;
      })
    );
  }
}
