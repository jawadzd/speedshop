import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { IItem } from '../../shared/models/item.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../account/services/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: IItem | null = null;
  showGoToCartButton = false;
  isAuthenticated = false; // Track authentication status
  currentQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    const itemId = this.route.snapshot.paramMap.get('id'); // Get the item id from the route
    if (itemId) {
      this.itemService.getItemById(+itemId).subscribe((item) => {
        this.item = item;
      });
    }
  }

  handleItemCountChange(count: number) {
    // Handle the count of the items in the cart
    this.currentQuantity = count;
    if (!this.isAuthenticated) {
      this.showLoginPrompt();
    } else {
      this.showGoToCartButton = count > 0;
    }
  }

  showLoginPrompt() {
    // Show the login prompt when not logged in to restrict access
    Swal.fire({
      title: 'Not Logged In',
      text: 'You need to log in to add items to the cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Back',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Store the current URL and redirect to login
        const returnUrl = this.router.url; // Current URL
        this.router.navigate(['/shell/login'], { queryParams: { returnUrl } });
      }
    });
  }

  goToCart() {
    // Navigate to the cart page
    this.router.navigate(['shell/feature/account/cart']);
  }

  async addToCart() {
    // Add the item to the cart
    if (this.item && this.isAuthenticated) {
      const userId = this.authService.getUserId();
      console.log(userId);

      if (userId !== null) {
        try {
          await this.cartService.addItemToCart(userId, {
            productId: this.item.id,
            quantity: this.currentQuantity,
          });

          Swal.fire('Success', 'Item added to cart successfully!', 'success');
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Failed to add item to cart.', 'error');
        }
      } else {
        Swal.fire('Error', 'Could not retrieve user information.', 'error');
      }
    }
  }
}
