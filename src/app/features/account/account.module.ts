import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CartComponent } from './components/cart/cart.component';
//this is the 4th level module that handle the account components whicha re special for each user

@NgModule({
  declarations: [AccountComponent, CartComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
