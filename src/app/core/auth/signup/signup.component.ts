import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISignupRequest } from './models/signup-request.model';
import { Router } from '@angular/router';
import { signup } from './store/signup.actions';
import { ISignupState } from './store/signup.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  private signupAttempted: boolean = false;

  constructor(private store: Store<{ signup: ISignupState }>, private router: Router) {
    // Move the subscription to the constructor to ensure it is only created once
    this.store.select(state => state.signup)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(signupState => {
        if (this.signupAttempted) {
          if (signupState.user && signupState.user.id) {
            alert('Signup successful, please login to continue');
            this.router.navigate(['/shell/login']);
          } else  {
            alert('Signup failed. Please try again.');
          }
        }
      }, error => {
        if (this.signupAttempted) {
          alert('An error occurred. Please try again later.');
        }
      });
  }

  onSubmit(): void {
    this.signupAttempted = true; 
    const request: ISignupRequest = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.store.dispatch(signup({ request }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
