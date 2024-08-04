import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { login } from './store/auth.actions';
import { IAuthState } from './store/auth.reducer';
import { ILoginRequest } from './models/login-request.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectAuthUser, selectAuthError, selectAuthLoading } from './store/auth.selectors';
import { TranslationService } from '../../../shared/services/translation.service'; // Import the TranslationService

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
    private translationService: TranslationService // Inject TranslationService
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && user.Login && user.Login.AccessToken) {
          const successMessage = this.translationService.getTranslation('LOGIN SUCCESSFUL');
          alert(successMessage);
          this.router.navigate(['/shell/feature/account']);
        }
      });

    this.error$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error) {
          const errorMessage = this.translationService.getTranslation('LOGIN FAILED MESSAGE');
          alert(errorMessage);
        }
      });
  }

  onSubmit(): void {
    const request: ILoginRequest = {
      username: this.username,
      password: this.password
    };

    this.store.dispatch(login({ request: request }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
