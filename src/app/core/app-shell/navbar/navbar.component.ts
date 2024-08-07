import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { IAuthState } from '../../auth/login/store/auth.reducer';
import { selectAuthUser } from '../../auth/login/store/auth.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { signout } from '../../auth/login/store/auth.actions';
import { KeyboardControlService } from '../../../shared/services/keyboard-control.service';
import { TranslationService } from '../../../shared/services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLocationAndDropdown: boolean = false; //initial state of showLocationAndDropdown
  isAuthenticated: boolean = false; //initial state of isAuthenticated
  keyboardControlEnabled: boolean = false; //initial state of keyboardControlEnabled
  private unsubscribe$ = new Subject<void>(); //creating a new Subject used to unsubscribe from the observables

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<IAuthState>,
    private keyboardControlService: KeyboardControlService,
    private translationService: TranslationService 
    //injection of services through the constructor
  ) {}


  //ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/shell/login' || this.router.url === '/shell/signup') {
          this.showLocationAndDropdown = true;//checkong the url and setting the showLocationAndDropdown to true or false
        } else {
          this.showLocationAndDropdown = false;
        }
        this.checkAuthentication();
      }
    });

    //selectAuthUser is a selector that selects the user from the store
    this.store.pipe(
      select(selectAuthUser),
      takeUntil(this.unsubscribe$)
    ).subscribe(user => {
      this.isAuthenticated = !!user;//checking if the user is authenticated
    });

    this.checkAuthentication();
    this.keyboardControlEnabled = this.keyboardControlService.isEnabled();//checking if the keyboard control is enabled
  }
 //authentication check function
  checkAuthentication(): void {
    this.authService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }
//signout function
  onSignOut(): void {
    this.store.dispatch(signout());
    this.router.navigate(['/shell/login']);
  }
//keyboard control function
  toggleKeyboardControl(): void {
    this.keyboardControlEnabled = !this.keyboardControlEnabled;
    this.keyboardControlService.setEnabled(this.keyboardControlEnabled);
  }

//detecting the language change
  onLanguageChange(lang: string): void {
    this.translationService.changeLanguage(lang);
   
  }
//ngOnDestroy is a lifecycle hook that is called when a directive, pipe, or service is destroyed. Use ngOnDestroy() to unsubscribe observables and detach event handlers to avoid memory leaks.
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
