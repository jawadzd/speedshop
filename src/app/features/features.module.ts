import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CardComponent } from './product-listing/components/card/card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  FeatureComponent,
  ProductListingComponent,
  CardComponent
    
  ],
  imports: [
    FeaturesRoutingModule,
    FeaturesRoutingModule,
    CommonModule

  ]
})
export class FeaturesModule { }
