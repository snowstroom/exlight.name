import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { PhotoComponent } from './pages/photo/photo.component';
import { VideoComponent } from './pages/video/video.component';
import { MusicComponent } from './pages/music/music.component';
import { AboutComponent } from './pages/about/about.page';
import { ArticleComponent } from './pages/article/article.page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';

const routes: Routes = [{
  path: '',
  component: MainComponent
}, {
  path: 'catalog',
  pathMatch: 'full',
  redirectTo: 'catalog/all/page/1'
}, {
  path: 'catalog/:cat/page/:page',
  component: CatalogComponent
}, {
  path: 'article/:article',
  component: ArticleComponent
}, {
  path: 'video',
  component: VideoComponent,
}, {
  path: 'photo',
  component: PhotoComponent,
}, {
  path: 'music',
  component: MusicComponent,
}, {
  path: 'about',
  component: AboutComponent,
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'authorization',
  children: [{
    path: '',
    component: AuthorizationComponent
  }, {
    path: 'forgot',
    component: ForgotPassowrdComponent
  }]
}, {
  path: '**',
  component: NotFoundComponent
}];

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
