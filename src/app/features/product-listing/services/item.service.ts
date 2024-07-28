import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }


  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.url);
  }
}
