import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { VideoComponent } from './pages/video/video.component';
import { MusicComponent } from './pages/music/music.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [ {
    path: '',
    component: MainComponent
  }, {
    path: 'catalog',
    component: CatalogComponent,
    children: [
    ]
  }, {
    path: 'video',
    component: VideoComponent
  }, {
    path: 'photo',
    component: PhotoComponent
  }, {
    path: 'music',
    component: MusicComponent
  }, {
    path: 'about',
    component: AboutComponent
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
