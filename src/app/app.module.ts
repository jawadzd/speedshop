import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './core/app-shell/shell.module';
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient  } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';
import { authReducer } from './core/auth/login/store/auth.reducer';
import { AuthEffects } from './core/auth/login/store/auth.effects';
import { signupReducer } from './core/auth/signup/store/signup.reducer';
import { SignupEffects } from './core/auth/signup/store/signup.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { itemReducer } from './features/product-listing/store/item.reducer';
import { ItemEffects } from './features/product-listing/store/item.effects';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';  


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShellModule,
    StoreModule.forRoot({ auth: authReducer, signup: signupReducer ,itemState: itemReducer}),
    EffectsModule.forRoot([AuthEffects, SignupEffects,ItemEffects]),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SweetAlert2Module.forRoot(),
    MatSnackBarModule,

  ],
  providers: [
    provideClientHydration(),
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    provideAnimationsAsync('noop')

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
