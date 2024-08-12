import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../../../shared/models/item.model';
import { environment } from '../../../../environments/environment.dev';
//this is the service that will be used to fetch the item by id from the API
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = environment.productsApi;

  constructor(private http: HttpClient) {}

  getItemById(id: number): Observable<IItem> {
    return this.http.get<IItem>(`${this.baseUrl}products/${id}`);
  }
}
