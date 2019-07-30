import { NgModule } from '@angular/core';
// MODULES
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ReactiveFormsModule } from '@angular/forms';
import { ExlightArticleModule } from '@article-module/article.module';
import { ExlightCoreModule } from '@core/core.module';
import { ExlightCommonModule } from '@common-module/common.module';
import { ExlightAccountModule } from '@account-module/account.module';

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

@NgModule({
  declarations: [
    AboutPage,
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
    AppRoutingModule,
    FontAwesomeModule,
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
