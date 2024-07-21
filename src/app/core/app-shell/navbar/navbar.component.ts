import { Component, OnInit } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showLocationAndDropdown: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLocationAndDropdown = this.router.url === '/shell/login';
      }
      this.checkAuthentication();
    });

    // Initial check for authentication
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onSignOut(): void {
    this.authService.removeToken();
    this.isAuthenticated = false;
    this.router.navigate(['/shell/login']);
  }
}