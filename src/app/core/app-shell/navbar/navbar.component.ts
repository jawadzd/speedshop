import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../auth/services/auth.service';
import { IAuthState } from '../../auth/login/models/auth-state.model';
import { selectAuthUser } from '../../auth/login/store/auth.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { signout } from '../../auth/login/store/auth.actions';
import { TranslationService } from '../../../shared/services/translation.service';
import { GeocodingService } from '../../../shared/services/geocoding.service';
import { SearchService } from '../../../shared/services/search.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLocationAndDropdown: boolean = false; //initial state of showLocationAndDropdown
  isAuthenticated: boolean = false; //initial state of isAuthenticated
  userLocation: string = 'Location'; //initial state of userLocations
  private unsubscribe$ = new Subject<void>(); //creating a new Subject used to unsubscribe from the observables

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<IAuthState>,
    private translationService: TranslationService ,
    private geocodingService: GeocodingService,
    private searchService :SearchService
    //injection of services through the constructor
  ) {}


  //ngOnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          const urlTree = this.router.parseUrl(this.router.url);
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
    this.getLocation();
  }
 //authentication check function
  checkAuthentication(): void {
    this.authService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

//search function
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(input){
    this.searchService.setSearchQuery(input.value);}
  }



//detecting the language change
  onLanguageChange(lang: string): void {
    this.translationService.changeLanguage(lang);
   
  }

   // Method to get user location
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      }, (error) => {
        console.error('Error getting location: ', error);
        this.userLocation = 'Location Unavailable';
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.userLocation = 'Geolocation Not Supported';
    }
  }

  showPosition(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    this.geocodingService.getAddress(lat, lon).subscribe(
      (response) => {
        if (response.results && response.results.length > 0) {
          this.userLocation = response.results[0].formatted; 
        } else {
          this.userLocation = 'Address Not Found';
        }
      },
      (error) => {
        console.error('Error fetching address:', error);
        this.userLocation = 'Error Fetching Address';
      }
    );
  }

//ngOnDestroy is a lifecycle hook that is called when a directive, pipe, or service is destroyed. Use ngOnDestroy() to unsubscribe observables and detach event handlers to avoid memory leaks.
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
