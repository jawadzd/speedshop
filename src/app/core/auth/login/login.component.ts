import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { IAuthState } from './store/auth.reducer';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  username: string = '';
  password: string = '';

  user$ = this.store.pipe(select(selectAuthUser));
  error$ = this.store.pipe(select(selectAuthError));
  loading$ = this.store.pipe(select(selectAuthLoading));

  constructor(
    private store: Store<{ auth: IAuthState }>,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.handleUserSubscription();
    this.handleErrorSubscription();
    this.handleLanguageChanges();
  }

  private handleUserSubscription(): void {
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      if (user?.Login?.AccessToken) {
        const title = this.translationService.getTranslation('LOGIN_SUCCESS_TITLE');
        const text = this.translationService.getTranslation('LOGIN_SUCCESS_TEXT');
        const confirmButtonText = this.translationService.getTranslation('CONTINUE_BUTTON_TEXT');

        Swal.fire({
          icon: 'success',
          title,
          text,
          showConfirmButton: true,
          confirmButtonText,
          customClass: {
            confirmButton: 'swal2-confirm',
          },
        }).then(() => {
          this.router.navigate(['/shell/feature/account']);
        });
      }
    });
  }

  private handleErrorSubscription(): void {
    this.error$.pipe(takeUntil(this.unsubscribe$)).subscribe((error) => {
      if (error) {
        const title = this.translationService.getTranslation('LOGIN_FAILED_TITLE');
        const text = this.translationService.getTranslation('LOGIN_FAILED_TEXT');
        const confirmButtonText = this.translationService.getTranslation('TRY_AGAIN_BUTTON_TEXT');

        Swal.fire({
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

  private handleLanguageChanges(): void {
    this.translationService.languageChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lang) => {
      });
  }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password,
    };

    this.store.dispatch(login({ request }));
  }

  onLanguageChange(lang: string): void {
    this.translationService.changeLanguage(lang);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
