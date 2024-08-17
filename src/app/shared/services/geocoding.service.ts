import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = 'xxxx';
  private apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient) { }

  getAddress(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}?q=${lat}+${lon}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
