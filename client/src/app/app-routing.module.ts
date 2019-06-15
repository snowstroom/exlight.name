import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AboutComponent } from './pages/about/about.page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { GuardService } from './guards/guard.service';
import { ARTICLE_ROUTES } from 'article-module/routes';

const routes: Routes = [{
  path: '',
  component: MainComponent
},
...ARTICLE_ROUTES,
{
  path: 'about',
  component: AboutComponent,
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'profile',
  component: ProfilePageComponent,
  canActivate: [GuardService]
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
