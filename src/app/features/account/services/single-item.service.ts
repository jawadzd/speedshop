import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../../../shared/models/item.model';// Update with the correct path to your model

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.example.com/products'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch product details for a list of IDs
  getProductDetailsByIds(productIds: number[]): Observable<IItem[]> {
    const url = `${this.apiUrl}?ids=${productIds.join(',')}`;
    return this.http.get<IItem[]>(url);
  }
}
