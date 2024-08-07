import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
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
//importing the necessary modules for the login component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();//subject to unsubscribe all the subscriptions

  username: string = '';//username to hold the username
  password: string = '';//password to hold the password

  user$ = this.store.pipe(select(selectAuthUser));//observable to hold the user
  error$ = this.store.pipe(select(selectAuthError));//observable to hold the error
  loading$ = this.store.pipe(select(selectAuthLoading));//observable to hold the loading state

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private translationService: TranslationService
  ) {}//injecting the necessary services and store

  ngOnInit(): void {
    this.handleUserSubscription();//handling the user subscription
    this.handleErrorSubscription();//handling the error subscription
    this.handleLanguageChanges();//handling the language changes
  }

  private handleUserSubscription(): void {//function to handle the user subscription
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user?.Login?.AccessToken) {//if the user is present then navigate to the account page and show the success message using the sweetalert
        const title = this.translationService.getTranslation('LOGIN_SUCCESS_TITLE');
        const text = this.translationService.getTranslation('LOGIN_SUCCESS_TEXT');
        const confirmButtonText = this.translationService.getTranslation('CONTINUE_BUTTON_TEXT');

        Swal.fire({//editing the sweetalert popup
          icon: 'success',
          title,
          text,
          showConfirmButton: true,
          confirmButtonText,
          customClass: {
            confirmButton: 'swal2-confirm',
          },
        }).then(() => {
          this.router.navigate(['/shell/feature/account']);//navigating to the account page
        });
      }
    });
  }

  private handleErrorSubscription(): void {//function to handle the error subscription
    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
      if (error) {
        const title = this.translationService.getTranslation('LOGIN_FAILED_TITLE');
        const text = this.translationService.getTranslation('LOGIN_FAILED_TEXT');
        const confirmButtonText = this.translationService.getTranslation('TRY_AGAIN_BUTTON_TEXT');

        Swal.fire({//editing the sweetalert popup for failed atttempt
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

  private handleLanguageChanges(): void {//function to handle the language changes
    this.translationService.languageChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lang) => {
      });
  }

  onSubmit(): void {//function to handle the form submission
    const request: ILoginRequest = {
      username: this.username,
      password: this.password,
    };

    this.store.dispatch(login({ request }));//dispatching the login action with the request payload
  }

  onLanguageChange(lang: string): void {//function to handle the language change
    this.translationService.changeLanguage(lang);//changing the language
  }

  ngOnDestroy(): void {//unsubscribing all the subscriptions
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
