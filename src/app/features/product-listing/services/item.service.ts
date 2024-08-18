import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../../../shared/models/item.model';
import { environment } from '../../../../environments/environment.dev';
//this is the service that will be used to fetch the items from the API
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url = environment.productsApi;

  constructor(private http: HttpClient) {}

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.url}products`);
  }

  getelec(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.url}products/category/electronics`);
  }

  getjew(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.url}products/category/jewelery`);
  }
  getmen(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.url}products/category/men's clothing`);
  }

  getwomen(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.url}products/category/women's clothing`);
  }
}
