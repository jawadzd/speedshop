import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { CartComponent } from './components/cart/cart.component';
import { AgGridModule } from 'ag-grid-angular'; //this is the module that will be used to display the cart items in a grid
import { DeleteComponent } from '../../shared/components/grid_components/delete/delete.component';
import { FormsModule } from '@angular/forms';
//this is the 4th level module that handle the account components whicha re special for each user

@NgModule({
  declarations: [
    AccountComponent,
    CartComponent,

    DeleteComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, AgGridModule,FormsModule],
})
export class AccountModule {}
