import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { signup } from './store/signup.actions';
import { ISignupState } from './store/signup.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectSignupUser ,selectSignupError} from './store/signup.selectors';

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


  user$ = this.store.pipe(select(selectSignupUser));
  error$ = this.store.pipe(select(selectSignupError));


  constructor(private store: Store<ISignupState>, private router: Router) {
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && user.id) {
          alert('Signup successful, please login to continue');
          this.router.navigate(['/shell/login']);
        }
      });

    this.error$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(error => {
        if (error) {
          alert('Signup failed. Please try again.');
        }
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
