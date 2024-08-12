import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { signup } from './store/signup.actions';
import { ISignupState } from './store/signup.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectSignupUser, selectSignupError } from './store/signup.selectors';
import Swal from 'sweetalert2';

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
  redirectUrl: string | null = null; // To hold the redirect URL

  constructor(
    private store: Store<ISignupState>,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to get query parameters
  ) {}

  ngOnInit(): void {
    // Get the redirect URL from query parameters
    this.redirectUrl = this.route.snapshot.queryParamMap.get('returnUrl');

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
            this.router.navigate(['/shell/login'], {
              queryParams: { returnUrl: this.redirectUrl } // Pass the redirect URL
            });
          });
        }
      });
  }

  onSubmit(): void {// Function to handle form submission
    const request = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };

    this.store.dispatch(signup({ request }));
  }

  ngOnDestroy(): void {// Unsubscribe from the Subject
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
