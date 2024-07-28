import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { IAuthState } from '../../auth/login/store/auth.reducer';
import { selectAuthUser } from '../../auth/login/store/auth.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { signout } from '../../auth/login/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLocationAndDropdown: boolean = false;
  isAuthenticated: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService, private store: Store<IAuthState>) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/shell/login' || this.router.url === '/shell/signup') {
          this.showLocationAndDropdown = true;
        } else {
          this.showLocationAndDropdown = false;
        }
        this.checkAuthentication();
      }
    });

    this.store.pipe(
      select(selectAuthUser),
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onSignOut(): void {
    this.store.dispatch(signout());
    this.router.navigate(['/shell/login']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
