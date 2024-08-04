import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeatureComponent } from './feature.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { CardComponent } from './product-listing/components/card/card.component';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { ItemComponent } from './item/item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryColorPipe } from '../shared/pipes/category-color.pipe';
import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
  FeatureComponent,
  ProductListingComponent,
  CardComponent,
  ItemComponent,
  CategoryColorPipe,
  CarouselComponent,
  LandingPageComponent


    
  ],
  imports: [
    FeaturesRoutingModule,
    CommonModule,

    AccountModule,
    NgbModule

  ]
})
export class FeaturesModule { }
