import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import {  loadItems,
  loadElectronics,
  loadJewelry,
  loadMensClothing,
  loadWomensClothing, } from '../../../features/product-listing/store/item.actions';
@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss'] 
})
export class CategoryBarComponent implements OnInit {
  showCategoryLinks: boolean = true;
  selectedCategory: string = 'all'; // Default to 'all'

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationStart) {
        const currentUrl = this.router.url;
        this.showCategoryLinks = !(
          currentUrl.includes('/shell/feature/account/profile') ||
          currentUrl.includes('/shell/feature/account/cart')
        );
      }
    });
  }

  
  onDrawerToggle(isOpen: boolean): void {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
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
