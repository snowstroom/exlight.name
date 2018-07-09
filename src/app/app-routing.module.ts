import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { VideoComponent } from './pages/video/video.component';
import { MusicComponent } from './pages/music/music.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [ {
    path: '',
    component: MainComponent,
    data: {
      title: 'eXlight - Главная'
    }
  }, {
    path: 'catalog/:id/page/:id',
    component: CatalogComponent,
    pathMatch: 'prefix',
    data: {
      title: 'eXlight - Каталог статей'
    }
  }, {
    path: 'video',
    component: VideoComponent,
    data: {
      title: 'eXlight - Видео'
    }
  }, {
    path: 'photo',
    component: PhotoComponent,
    data: {
      title: 'eXlight - Фото'
    }
  }, {
    path: 'music',
    component: MusicComponent,
    data: {
      title: 'eXlight - Музыка'
    }
  }, {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'eXlight - Об авторе'
    }
  }, {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'eXlight - Не найдено'
    }
  } ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
