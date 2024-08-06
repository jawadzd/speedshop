import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { signup } from './store/signup.actions';
import { ISignupState } from './store/signup.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectSignupUser, selectSignupError } from './store/signup.selectors';
import Swal from 'sweetalert2';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  user$ = this.store.pipe(select(selectSignupUser));

  constructor(private store: Store<ISignupState>, private router: Router) {}

  ngOnInit(): void {
    this.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user && user.id) {
          Swal.fire({
            icon: 'success',
            title: 'Signup Successful',
            text: 'Please login to continue',
            confirmButtonText: 'Continue'
          }).then(() => {
            this.router.navigate(['/shell/login']);
          });
        }
      });
  }
  emailDomainValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const email = control.value;
      if (email && !email.includes('@') || !email.endsWith('.com')) {
        return { 'invalidEmail': true };
      }
      return null;
    };
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
