import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ProductService } from '../../services/single-item.service';
import { Observable, forkJoin, switchMap, map } from 'rxjs';
import { IItem } from '../../../../shared/models/item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<{ id: number; title: string; price: number; quantity: number; image: string }[]> | undefined;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.cartItems$ = this.cartService.getUserCart(userId).pipe(
        switchMap(cartItems => {
          const productRequests = cartItems.map(item =>
            this.productService.getProductDetailsById(item.productId).pipe(
              map((product: IItem) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
                image: product.image
              }))
            )
          );
          return forkJoin(productRequests);
        })
      );
    } else {
      console.error('User ID not found');
    }
  }
}
