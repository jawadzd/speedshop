import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShellRoutingModule } from './shell-routing.module';
import { LoginComponent } from '../auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ShellComponent } from './shell.component';
import { CardComponent } from '../../features/product-listing/components/card/card.component';
import { FeaturesModule } from '../../features/features.module';





@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    ShellComponent,
    CardComponent,
    
    
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    FormsModule,
    FeaturesModule

  ]
})
export class ShellModule { }
