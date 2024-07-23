import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: ProductListingComponent },
  { path: '', redirectTo: 'Account', pathMatch: 'full' },
  { path: 'Account', component: AccountComponent, loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
