import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData$: Observable<{ productId: number; quantity: number }[]> = new Observable();

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.cartData$ = this.cartService.getUserCart(userId);
    } else {
      console.error('User ID not found');
    }
  }
}
