import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './core/app-shell/shell.module';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { authReducer } from './core/auth/login/store/auth.reducer';
import { AuthEffects } from './core/auth/login/store/auth.effects';
import { signupReducer } from './core/auth/signup/store/signup.reducer';
import { SignupEffects } from './core/auth/signup/store/signup.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemReducer } from './features/product-listing/store/item.reducer';
import { ItemEffects } from './features/product-listing/store/item.effects';


@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShellModule,
    StoreModule.forRoot({ auth: authReducer, signup: signupReducer ,itemState: itemReducer}),
    EffectsModule.forRoot([AuthEffects, SignupEffects,ItemEffects])

  ],
  providers: [
    provideClientHydration(),
    CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
