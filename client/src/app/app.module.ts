import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { RightComponent } from './components/right/right.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { VideoComponent } from './pages/video/video.component';
import { MusicComponent } from './pages/music/music.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { AboutComponent } from './pages/about/about.page';
import { ArticleComponent } from './pages/article/article.page';
import { SliderComponent } from './components/slider/slider.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { ArticleItemComponent } from './components/article-item/article-item.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MusicItemComponent } from './components/music-item/music-item.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { InitService } from './services/init.service';
import { ArticleProgressComponent } from './components/article-progress/article-progress.component';
import { SpinnerComponent } from './components/spinner/text-spinner/spinner.component';
import { LineSpinnerComponent } from './components/spinner/line-spinner/line-spinner.component';
import { markedOptionsFactory } from './markdown.config';
import { ShareContentComponent } from './components/share-content/share-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    RightComponent,
    AudioPlayerComponent,
    MainComponent,
    CatalogComponent,
    VideoComponent,
    MusicComponent,
    PhotoComponent,
    AboutComponent,
    SliderComponent,
    ArticleProgressComponent,
    ArticleComponent,
    PaginationComponent,
    CatalogMenuComponent,
    ArticleItemComponent,
    NotFoundComponent,
    MusicItemComponent,
    PhotoItemComponent,
    SpinnerComponent,
    LineSpinnerComponent,
    ShareContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      }
    })
  ],
  providers: [
    Title,
    Meta,
    InitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (srv: InitService) => () => srv.initFonts(),
      deps: [InitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
