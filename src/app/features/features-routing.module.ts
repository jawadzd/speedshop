import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AccountComponent } from './account/account.component';
import { LoginGuard } from '../core/auth/guards/login.guard';

const routes: Routes = [
  { path: '', component: ProductListingComponent },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: 'account', component: AccountComponent, canActivate: [LoginGuard],loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
