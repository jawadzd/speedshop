import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DataComponent } from './components/data/data.component';
import { AgGridAngular } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AccountComponent,
    DataComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AgGridAngular
    
  ]
})
export class AccountModule { }
