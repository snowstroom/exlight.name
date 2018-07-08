import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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
import { AboutComponent } from './pages/about/about.component';
import { SliderComponent } from './components/slider/slider.component';
import { ArticleComponent } from './components/article/article.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CatalogMenuComponent } from './components/catalog-menu/catalog-menu.component';
import { ArticlesComponent } from './components/articles/articles.component';

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
    ArticleComponent,
    PaginationComponent,
    CatalogMenuComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }