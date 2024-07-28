import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../../../shared/models/item.model';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = environment.productsApi; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getItemById(id: number): Observable<IItem> {
    return this.http.get<IItem>(`${this.baseUrl}products/${id}`);
  }
}
