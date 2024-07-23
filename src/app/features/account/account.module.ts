import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DataComponent } from './components/data/data.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ChipComponent } from './components/data/components/chip/chip.component';
import { EditorComponent } from './components/data/components/editor/editor.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AccountComponent,
    DataComponent,
    ChipComponent,
    EditorComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AgGridAngular,
    FormsModule
    
  ]
})
export class AccountModule { }
