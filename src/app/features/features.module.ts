import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
  FeatureComponent,
  ProductListingComponent
    
  ],
  imports: [
    FeaturesRoutingModule,
    FeaturesRoutingModule,
    CommonModule

  ]
})
export class FeaturesModule { }
