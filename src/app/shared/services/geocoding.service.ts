import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = environment.apiKeyGeo; 
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) { }

  getAddress(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?q=${lat}+${lon}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
