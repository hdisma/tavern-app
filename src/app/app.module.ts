import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { SigninCallbackRedirectComponent } from './shared/components/signin-callback-redirect/signin-callback-redirect.component';
import { SignoutCallbackRedirectComponent } from './shared/components/signout-callback-redirect/signout-callback-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    SigninCallbackRedirectComponent,
    SignoutCallbackRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
