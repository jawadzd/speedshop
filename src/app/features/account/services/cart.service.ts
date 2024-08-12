import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.dev';
//this is the service that will be used to fetch the cart of the user from the API
//still have a problem as i still dont know the user id and the fetching of the user id is not implemented yet
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = environment.productsApi;

  constructor(private http: HttpClient) {}

  getUserCart(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}carts/user/${userId}`);
  }

  addItemToCart(
    userId: number,
    item: { productId: number; quantity: number }
  ): Observable<any> {
    const body = {
      userId,
      date: new Date().toISOString(), // current date
      products: [item],
    };

    return this.http.post<any>(`${this.apiUrl}carts`, body);
  }
}
