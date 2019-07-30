import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExlightCommonModule } from '@app/common-module/common.module';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { INIT_FONTS } from '@app/app/services/providers/init.provider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExlightCommonModule,
    RouterModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    INIT_FONTS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
