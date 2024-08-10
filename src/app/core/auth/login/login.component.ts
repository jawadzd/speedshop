import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { login } from './store/auth.actions';
import { IAuthState } from './models/auth-state.model';
import { ILoginRequest } from './models/login-request.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  selectAuthUser,
  selectAuthError,
  selectAuthLoading,
} from './store/auth.selectors';
import { TranslationService } from '../../../shared/services/translation.service';
import Swal from 'sweetalert2';

// Importing the necessary modules for the login component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>(); // Subject to unsubscribe all the subscriptions

  username: string = ''; // Username to hold the username
  password: string = ''; // Password to hold the password

  user$ = this.store.pipe(select(selectAuthUser)); // Observable to hold the user
  error$ = this.store.pipe(select(selectAuthError)); // Observable to hold the error
  loading$ = this.store.pipe(select(selectAuthLoading)); // Observable to hold the loading state

  returnUrl: string = '/'; // Default redirect path if no returnUrl is specified

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to access query parameters
    private translationService: TranslationService
  ) {} // Injecting the necessary services and store

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; // Capture the returnUrl
    this.handleUserSubscription(); // Handling the user subscription
    this.handleErrorSubscription(); // Handling the error subscription
    this.handleLanguageChanges(); // Handling the language changes
  }

  private handleUserSubscription(): void { // Function to handle the user subscription
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user?.Login?.AccessToken) { // If the user is present then navigate to the account page and show the success message using SweetAlert
        const title = this.translationService.getTranslation('LOGIN_SUCCESS_TITLE');
        const text = this.translationService.getTranslation('LOGIN_SUCCESS_TEXT');
        const confirmButtonText = this.translationService.getTranslation('CONTINUE_BUTTON_TEXT');

        Swal.fire({ // Editing the SweetAlert popup
          icon: 'success',
          title,
          text,
          showConfirmButton: true,
          confirmButtonText,
          customClass: {
            confirmButton: 'swal2-confirm',
          },
        }).then(() => {
          this.router.navigateByUrl(this.returnUrl); // Use the returnUrl for redirection
        });
      }
    });
  }

  private handleErrorSubscription(): void { // Function to handle the error subscription
    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
      if (error) {
        const title = this.translationService.getTranslation('LOGIN_FAILED_TITLE');
        const text = this.translationService.getTranslation('LOGIN_FAILED_TEXT');
        const confirmButtonText = this.translationService.getTranslation('TRY_AGAIN_BUTTON_TEXT');

        Swal.fire({ // Editing the SweetAlert popup for failed attempt
          icon: 'error',
          title,
          text,
          showConfirmButton: true,
          confirmButtonText,
          customClass: {
            confirmButton: 'swal2-confirm',
          },
        });
      }
    });
  }

  private handleLanguageChanges(): void { // Function to handle the language changes
    this.translationService.languageChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lang) => {
        // Language change logic here if needed
      });
  }

  onSubmit(): void { // Function to handle the form submission
    const request: ILoginRequest = {
      username: this.username,
      password: this.password,
    };

    this.store.dispatch(login({ request })); // Dispatching the login action with the request payload
  }

  onLanguageChange(lang: string): void { // Function to handle the language change
    this.translationService.changeLanguage(lang); // Changing the language
  }

  ngOnDestroy(): void { // Unsubscribing all the subscriptions
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
