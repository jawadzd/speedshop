import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DataComponent } from './components/data/data.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  {path: 'account/data',component: DataComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
