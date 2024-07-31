import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { LoginGuard } from '../core/auth/guards/login.guard';
import { ItemComponent } from './item/item.component';
import { authGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProductListingComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'account',canActivate: [authGuard],loadChildren: () => import('../features/account/account.module').then(m => m.AccountModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
