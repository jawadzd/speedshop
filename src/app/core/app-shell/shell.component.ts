//basic shell component to hold the header and footer of the application
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadItems,
  loadElectronics,
  loadJewelry,
  loadMensClothing,
  loadWomensClothing,
} from '../../features/product-listing/store/item.actions';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  showCategoryLinks: boolean = true;
  selectedCategory: string = 'all'; // Default to 'all'

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showCategoryLinks = !(
          this.router.url.includes('/shell/feature/account/profile') ||
          this.router.url.includes('/shell/feature/account/cart')
        );
        // Update selectedCategory based on current route
      }
    });
  }
  onDrawerToggle(isOpen: boolean): void {
    const matDrawerContainer = document.querySelector('.example-container');
    
    if (isOpen) {
      if (matDrawerContainer) {
        matDrawerContainer.classList.add('no-scroll'); // Add a class to disable scroll
      }
    } else {
      if (matDrawerContainer) {
        matDrawerContainer.classList.remove('no-scroll'); // Remove the class to re-enable scroll
      }
    }
  }
  navigateToCategory(category: string): void {
    // Update selectedCategory before navigation
    this.selectedCategory = category;

    // Ensure that the route is /shell/feature/product-listing
    if (!this.router.url.includes('/shell/feature/product-listing')) {
      this.router.navigate(['/shell/feature/product-listing']).then(() => {
        this.dispatchCategoryAction(category);
      });
    } else {
      this.dispatchCategoryAction(category);
    }
  }

  private dispatchCategoryAction(category: string): void {
    switch (category) {
      case 'electronics':
        this.store.dispatch(loadElectronics());
        break;
      case 'jewelry':
        this.store.dispatch(loadJewelry());
        break;
      case 'mens':
        this.store.dispatch(loadMensClothing());
        break;
      case 'womens':
        this.store.dispatch(loadWomensClothing());
        break;
      default:
        this.store.dispatch(loadItems());
        break;
    }
  }
}
