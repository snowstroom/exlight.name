import { NgModule } from '@angular/core';
import { APP_ROUTES } from './routes';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

// MODULES
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ReactiveFormsModule } from '@angular/forms';
import { ExlightArticleModule } from '@article-module/article.module';
import { ExlightCoreModule } from '@core/core.module';
import { ExlightCommonModule } from '@common-module/common.module';
import { ExlightAccountModule } from '@account-module/account.module';
import { RouterModule } from '@angular/router';

// PROVIDERS
import { HUMMER_PROVIDER } from './services/providers/hummer.provider';
import { INIT_FONTS } from './services/providers/init.provider';

// COMPONENTS
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { SliderComponent } from './components/slider/slider.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ArticleProgressComponent } from './components/article-progress/article-progress.component';
import { ShareContentComponent } from './components/share-content/share-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { AboutPage } from './pages/about/about.page';
import { ProfileOutsideComponent } from './components/profile-outside/profile-outside.component';

// DIRECTIVES
import { AccessDirective } from './directives/access.directive';
import { INTERSEPTOR } from './services/providers/interseptor.provider';
import { RegistrationConfirmPage } from './pages/registration-confirm/registration-confirm.page';
import { RegistrationDisablePage } from './pages/registration-disable/registration-disable.page';
import { LOCALE } from './services/providers/locale.provider';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AboutPage,
    RegistrationConfirmPage,
    RegistrationDisablePage,
    AppComponent,
    MainComponent,
    SliderComponent,
    ArticleProgressComponent,
    NotFoundComponent,
    ShareContentComponent,
    SideNavComponent,
    RegistrationComponent,
    AuthorizationComponent,
    ForgotPassowrdComponent,
    ProfileOutsideComponent,
    AccessDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    NgxJsonLdModule,
    ReactiveFormsModule,
    ExlightArticleModule,
    ExlightCoreModule,
    ExlightCommonModule,
    ExlightAccountModule
  ],
  providers: [
    Title,
    Meta,
    INIT_FONTS,
    HUMMER_PROVIDER,
    INTERSEPTOR,
    LOCALE
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
