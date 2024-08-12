import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { IItem } from '../../shared/models/item.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../account/services/cart.service';
//this is the item component that will show the details of the item when selected
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  item: IItem | null = null;
  showGoToCartButton = false;
  isAuthenticated = false; // Track authentication status

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

    const itemId = this.route.snapshot.paramMap.get('id'); //get the item id from the route
    if (itemId) {
      this.itemService.getItemById(+itemId).subscribe((item) => {
        this.item = item;
      });
    }
  }

  handleItemCountChange(count: number) {
    //this is to handle the count of the items in the cart
    if (!this.isAuthenticated) {
      this.showLoginPrompt();
    } else {
      this.showGoToCartButton = count > 0;
    }
  }

  showLoginPrompt() {
    //this is to show the login prompt when not logged in to restrict access
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
        this.router.navigate(['/login'], { queryParams: { returnUrl } });
      }
    });
  }

  goToCart() {
    //this is to navigate to the cart page
    this.router.navigate(['account/cart']);
  }

  addToCart() {
    //this is to add the item to the cart
    if (this.item && this.isAuthenticated) {
      const userId = this.authService.getUserId();
      console.log(userId);

      if (userId !== null) {
        this.cartService
          .addItemToCart(userId, {
            productId: this.item.id,
            quantity: 1, //this should be dynamic
          })
          .subscribe(
            (response) => {
              Swal.fire(
                'Success',
                'Item added to cart successfully!',
                'success'
              );
            },
            (error) => {
              Swal.fire('Error', 'Failed to add item to cart.', 'error');
            }
          );
      } else {
        Swal.fire('Error', 'Could not retrieve user information.', 'error');
      }
    }
  }
}
