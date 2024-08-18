import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import Swal from 'sweetalert2';
import { signout } from '../../auth/login/store/auth.actions';
import { KeyboardControlService } from '../../../shared/services/keyboard-control.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  isAuthenticated: boolean = false;
  userName: string = '';
  keyboardControlEnabled: boolean = false; //initial state of keyboardControlEnabled
  LightTheme:boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private keyboardControlService: KeyboardControlService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      if (isAuth) {
        this.userName = this.authService.getUserName() || 'User';
      }
    });

    this.keyboardControlEnabled = this.keyboardControlService.isEnabled(); //checking if the keyboard control is enabled
    this.LightTheme
  }

  //keyboard control function
  toggleKeyboardControl(): void {
    this.keyboardControlEnabled = !this.keyboardControlEnabled;
    this.keyboardControlService.setEnabled(this.keyboardControlEnabled);
  }

  ChangeTheme() :void{
  this.LightTheme = !this.LightTheme;

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
          const returnUrl = "/shell/feature/account/profile"; // Current URL
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

  //signout function
  onSignOut(): void {
    this.store.dispatch(signout());
    this.router.navigate(['/login']);
  }
}
