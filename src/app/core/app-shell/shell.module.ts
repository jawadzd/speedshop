import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { ShellRoutingModule } from './shell-routing.module';
import { LoginComponent } from '../auth/login/login.component';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    AppModule,
    FormsModule
  ]
})
export class ShellModule { }
