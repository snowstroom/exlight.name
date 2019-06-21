import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AboutPage } from './pages/about/about.page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { ProfilePageComponent } from './pages/profile/profile.page';
import { GuardService } from './services/guards/guard.service';
import { ARTICLE_ROUTES } from '@article-module/routes';
import { IExlightRoute } from './interfaces/exlight-router';

const routes: IExlightRoute[] = [{
  path: '',
  component: MainComponent,
  data: {
    showAside: false,
    haveNoBackground: true
  }
},
...ARTICLE_ROUTES,
{
  path: 'about',
  component: AboutPage,
  data: {
    showAside: true
  }
}, {
  path: 'registration',
  component: RegistrationComponent,
  data: {
    showAside: false
  }
}, {
  path: 'profile',
  children: [{
    path: '',
    component: ProfilePageComponent,
    canActivate: [GuardService],
    data: {
      showAside: false
    }
  }]
},/* {
    path: 'settings'
  }, {
    path: 'articles',
    children: [{
      path: 'create'
    }, {
      path: 'statistic'
    }]
  }, {
    path: 'roles',
    children: [{
      path: ''
    }, {
      path: 'create'
    }]
  }, {
    path: 'categories'
  }, {

  }]
},*/ {
  path: 'authorization',
  children: [{
    path: '',
    component: AuthorizationComponent,
    data: {
      showAside: false
    }
  }, {
    path: 'forgot',
    component: ForgotPassowrdComponent,
    data: {
      showAside: false
    }
  }]
}, {
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
