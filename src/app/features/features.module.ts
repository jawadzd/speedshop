import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CardComponent } from './product-listing/components/card/card.component';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { ItemComponent } from './item/item.component';
import { CategoryColorPipe } from '../shared/pipes/category-color.pipe';
@NgModule({
  declarations: [
  FeatureComponent,
  ProductListingComponent,
  CardComponent,
  ItemComponent,
  CategoryColorPipe

    
  ],
  imports: [
    FeaturesRoutingModule,
    CommonModule,
    AccountModule

  ]
})
export class FeaturesModule { }
