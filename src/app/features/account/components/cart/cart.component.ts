import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any[] = [];
  userId: number | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      await this.loadCartData();
    } else {
      console.error('User ID not found');
    }
  }

  async loadCartData(): Promise<void> {
    if (this.userId === null) {
      console.error('Cannot load cart data without a valid user ID');
      return;
    }

    try {
      const data = await this.cartService.getUserCart(this.userId);
      this.cartData = data;
      console.log(this.cartData);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
}
