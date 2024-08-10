import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from './services/item.service';
import { IItem } from '../../shared/models/item.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/auth/services/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication status
    this.authService.isAuthenticated.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.itemService.getItemById(+itemId).subscribe((item) => {
        this.item = item;
      });
    }
  }

  handleItemCountChange(count: number) {
    if (!this.isAuthenticated) {
      this.showLoginPrompt();
    } else {
      this.showGoToCartButton = count > 0;
    }
  }

  showLoginPrompt() {
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
        this.router.navigate(['/login']);
      }
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToMainPage() {
    this.router.navigate(['/']);
  }
}
