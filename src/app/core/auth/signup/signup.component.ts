import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
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

  constructor(private store: Store<{ signup: ISignupState }>, private router: Router) {
    this.store.select(state => state.signup).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(signupState => {
      if (signupState.user && signupState.user.id) {
        alert('Signup successful, please login to continue');
        this.router.navigate(['/shell/login']);
      } else if (signupState.error) {
        alert('Signup failed. Please try again.');
      }
    }, error => {
      alert('An error occurred. Please try again later.');
    });
  }

  onSubmit(): void {
    const request = {
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
