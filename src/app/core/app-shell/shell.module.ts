import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellRoutingModule } from './shell-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { FeaturesModule } from '../../features/features.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CategoryBarComponent } from './category-bar/category-bar.component';


//this is the second level module to hold the shell components and the features module with all needed imports,routing and services

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ShellComponent,
    SignupComponent,
    SidenavComponent,
    CategoryBarComponent
    
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ShellRoutingModule,
    FormsModule,
    MatDividerModule,
    FeaturesModule,
    MatSidenavModule,
    TranslateModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule

  ],
})
export class ShellModule {}
