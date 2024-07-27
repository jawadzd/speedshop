import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './core/app-shell/shell.module';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { authReducer } from './core/auth/login/store/auth.reducer';
import { AuthEffects } from './core/auth/login/store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ShellModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects])

  ],
  providers: [
    provideClientHydration(),
    CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
