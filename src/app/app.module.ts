import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './core/app-shell/navbar/navbar.component';
import { CardComponent } from './features/product-listing/components/card/card.component';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { LoginComponent } from './core/auth/login/login.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { ProductListingComponent } from './features/product-listing/product-listing.component';
import { FooterComponent } from './core/app-shell/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    LoginComponent,
    LandingPageComponent,
    ProductListingComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
