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

//shell module to hold the shell components and the features module with all needed imports,routing and services

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ShellComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    FormsModule,
    FeaturesModule,
    TranslateModule,
  ],
})
export class ShellModule {}
