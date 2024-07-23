import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './core/app-shell/shell.module';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    ShellModule
   

  ],
  providers: [
    provideClientHydration(),
    CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
