import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { IAuthState } from './store/auth.reducer';
import { ILoginRequest } from './models/login-request.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectAuthUser, selectAuthError, selectAuthLoading } from './store/auth.selectors';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    console.log('LoginComponent initialized');
    console.log('Current language:', this.translationService['translate'].currentLang);

    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && user.Login && user.Login.AccessToken) {
          alert('Login successful');
          this.router.navigate(['/shell/feature/account']);
        }
      });

    this.error$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error) {
          alert('Login failed. Please check your username and password.');
        }
      });

    this.translationService.languageChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lang => {
        console.log('Language changed to:', lang);
        // Trigger change detection or any other action you need when language changes
      });
  }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.store.dispatch(login({ request: request }));
  }

  onLanguageChange(lang: string): void {
    this.translationService.changeLanguage(lang);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
