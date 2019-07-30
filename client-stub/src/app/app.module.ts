import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExlightCommonModule } from '@app/common-module/common.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExlightCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
