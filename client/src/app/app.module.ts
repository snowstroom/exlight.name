import { NgModule } from '@angular/core';
// MODULES
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ReactiveFormsModule } from '@angular/forms';
import { ExlightArticleModule } from '@article-module/article.module';
import { CoreModule } from '@core/core.module';
import { ExlightCommonModule } from 'common-module/common.module';

// PROVIDERS
import { HUMMER_PROVIDER } from './services/providers/hummer.provider';
import { INIT_PROVIDER } from './services/providers/init.provider';

// COMPONENTS
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { RightComponent } from './components/right/right.component';
import { MainComponent } from './pages/main/main.component';
import { SliderComponent } from './components/slider/slider.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { InitService } from './services/init.service';
import { ArticleProgressComponent } from './components/article-progress/article-progress.component';
import { ShareContentComponent } from './components/share-content/share-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { AboutPage } from './pages/about/about.page';

@NgModule({
  declarations: [
    AboutPage,
    AppComponent,
    FooterComponent,
    MenuComponent,
    RightComponent,
    MainComponent,
    SliderComponent,
    ArticleProgressComponent,
    NotFoundComponent,
    ShareContentComponent,
    SideNavComponent,
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
    ExlightArticleModule,
    CoreModule,
    ExlightCommonModule,
  ],
  providers: [
    Title,
    Meta,
    InitService,
    INIT_PROVIDER,
    HUMMER_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
