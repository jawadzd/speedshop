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
  //this is the cart component that will be used to display the cart data
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (this.userId !== null) {
      this.loadCartData();
    } else {
      console.error('User ID not found');
    }
  }

  loadCartData(): void {
    if (this.userId === null) {
      console.error('Cannot load cart data without a valid user ID');
      return;
    }

    this.cartService.getUserCart(this.userId).subscribe(
      (data) => {
        this.cartData = data;
        console.log(this.cartData);
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }
}
