import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadItems,
  loadElectronics,
  loadJewelry,
  loadMensClothing,
  loadWomensClothing,
} from '../../../features/product-listing/store/item.actions';
@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent implements OnInit {
  showCategoryLinks: boolean = true;
  isDropdownVisible = false;
  isSmallScreen = false;
  selectedCategory: string = 'all';

  constructor(private router: Router, private store: Store) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }


  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth <= 768;
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
    this.isDropdownVisible = !this.isDropdownVisible;
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }
  }
  navigateToCategory(category: string): void {
      this.selectedCategory = category;
    this.isDropdownVisible = false;
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
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
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
