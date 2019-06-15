// MODULES
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule} from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ReactiveFormsModule } from '@angular/forms';
import { ExlightArticleModule } from '@article-module/article.module';
import { CoreModule } from '@core/core.module';

// PROVIDERS
import { HUMMER_PROVIDER } from './services/providers/hummer.provider';
import { MARKDOWN_PROVIDER } from './services/providers/markdown.provider';
import { INIT_PROVIDER } from './services/providers/init.provider';

// COMPONENTS
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
import { ShareContentComponent } from './components/share-content/share-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RatingComponent } from './components/rating/rating.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { ProfilePageComponent } from './pages/profile/profile.page';

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
    MarkdownModule.forRoot({ markedOptions: MARKDOWN_PROVIDER }),
    ExlightArticleModule,
    CoreModule
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
