import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../../../shared/models/item.model'; // Update with the correct path to your model
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.productsApi;

  constructor(private http: HttpClient) {}

  // Fetch product details for a single ID
  getProductDetailsById(productId: number): Observable<IItem> {
    const url = `${this.apiUrl}products/${productId}`;
    return this.http.get<IItem>(url);
  }
}
