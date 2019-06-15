import { BrowserModule, Title, Meta, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { RightComponent } from './components/right/right.component';
import { MainComponent } from './pages/main/main.component';
import { SliderComponent } from './components/slider/slider.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InitService } from './services/init.service';
import { ArticleProgressComponent } from './components/article-progress/article-progress.component';
import { SpinnerComponent } from './components/spinner/text-spinner/spinner.component';
import { LineSpinnerComponent } from './components/spinner/line-spinner/line-spinner.component';
import { markedOptionsFactory } from './configs/markdown.config';
import { ShareContentComponent } from './components/share-content/share-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HummerConfig } from './configs/hammer-config';
import { RatingComponent } from './components/rating/rating.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    RightComponent,
    MainComponent,
    SliderComponent,
    ArticleProgressComponent,
    PaginationComponent,
    CatalogMenuComponent,
    NotFoundComponent,
    SpinnerComponent,
    LineSpinnerComponent,
    ShareContentComponent,
    SideNavComponent,
    RatingComponent,
    RegistrationComponent,
    AuthorizationComponent,
    ForgotPassowrdComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxJsonLdModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    }),
    CoreModule
  ],
  providers: [
    Title,
    Meta,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (srv: InitService) => async () => srv.initApplication(),
      deps: [InitService],
      multi: true
    }, {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HummerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
