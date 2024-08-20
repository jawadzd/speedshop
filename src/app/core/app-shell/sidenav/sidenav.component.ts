import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import Swal from 'sweetalert2';
import { signout } from '../../auth/login/store/auth.actions';
import { KeyboardControlService } from '../../../shared/services/keyboard-control.service';
import { TranslationService } from '../../../shared/services/translation.service';
import { GeocodingService } from '../../../shared/services/geocoding.service';
import { ThemeService } from '../../../shared/services/theme.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  currentLanguage: string = 'en';
  currentFlag: string = 'assets/flags/en.png';
  isAuthenticated: boolean = false;
  userLocation: string = 'Location'; //initial state of userLocations
  userName: string = '';
  keyboardControlEnabled: boolean = false; //initial state of keyboardControlEnabled
  LightTheme: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService,
    private store: Store,
    private translationService: TranslationService,
    private geocodingService: GeocodingService,
    private keyboardControlService: KeyboardControlService
  ) {
    this.LightTheme = localStorage.getItem('theme') === 'light-theme';
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.userName = this.authService.getUserName() || 'User';
      }
    });

    this.keyboardControlEnabled = this.keyboardControlService.isEnabled(); //checking if the keyboard control is enabled
    this.LightTheme;
    this.getLocation();
  }

  //keyboard control function
  toggleKeyboardControl(): void {
    this.keyboardControlEnabled = !this.keyboardControlEnabled;
    this.keyboardControlService.setEnabled(this.keyboardControlEnabled);
  }

  ChangeTheme(): void {
    this.LightTheme = !this.LightTheme;
    this.themeService.toggleTheme(this.LightTheme);
  }

  //function to navigate to the cart
  gotocart(): void {
    if (this.isAuthenticated) {
      this.router.navigate(['/shell/feature/account/cart']);
    } else {
      this.showLoginPrompt();
    }
  }

  gotoprofile(): void {
    if (this.isAuthenticated) {
      this.router.navigate(['/shell/feature/account/profile']);
    } else {
      Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in first.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Back',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Store the current URL and redirect to login
          const returnUrl = '/shell/feature/account/profile'; // Current URL
          this.router.navigate(['/login'], { queryParams: { returnUrl } });
        }
      });
    }
  }

  showLoginPrompt() {
    // Show the login prompt when not logged in to restrict access
    Swal.fire({
      title: 'Not Logged In',
      text: 'You need to log in first.',
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

  cycleLanguage() {
    if (this.currentLanguage === 'en') {
      this.currentLanguage = 'fr';
      this.currentFlag = 'assets/flags/fr.png';
      this.onLanguageChange('fr');
    } else if (this.currentLanguage === 'fr') {
      this.currentLanguage = 'ru';
      this.currentFlag = 'assets/flags/ru.png';
      this.onLanguageChange('ru');
    } else {
      this.currentLanguage = 'en';
      this.currentFlag = 'assets/flags/en.png';
      this.onLanguageChange('en');
    }
  }

  onLanguageChange(lang: string): void {
    this.translationService.changeLanguage(lang);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.showPosition(position);
        },
        (error) => {
          console.error('Error getting location: ', error);
          this.userLocation = 'Location Unavailable';
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.userLocation = 'Geolocation Not Supported';
    }
  }

  showPosition(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.geocodingService.getAddress(lat, lon).subscribe(
      (response) => {
        if (response.results && response.results.length > 0) {
          this.userLocation = response.results[0].formatted;
        } else {
          this.userLocation = 'Address Not Found';
        }
      },
      (error) => {
        console.error('Error fetching address:', error);
        this.userLocation = 'Error Fetching Address';
      }
    );
  }

  //signout function
  onSignOut(): void {
    this.store.dispatch(signout());
    this.router.navigate(['/login']);
  }
}
