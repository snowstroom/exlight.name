import { MainComponent } from './pages/main/main.component';
import { AboutPage } from './pages/about/about.page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegistrationComponent } from './pages/registration/registration.page';
import { AuthorizationComponent } from './pages/authorization/authorization.page';
import { ForgotPassowrdComponent } from './pages/forgot/forgot.page';
import { IExlightRoute } from './interfaces/exlight-router';
import { RegistrationConfirmPage } from './pages/registration-confirm/registration-confirm.page';
import { RegistrationDisablePage } from './pages/registration-disable/registration-disable.page';

export const APP_ROUTES: IExlightRoute[] = [
  {
    path: '',
    component: MainComponent,
    data: {
      showAside: false,
      haveNoBackground: true,
    },
  },
  {
    path: 'about',
    component: AboutPage,
    data: {
      showAside: true,
    },
  },
  {
    path: 'registration',
    children: [
      {
        path: '',
        component: RegistrationComponent,
        data: {
          showAside: false,
        },
      },
      {
        path: 'confirm/:hash',
        component: RegistrationConfirmPage,
        data: {
          showAside: false,
        },
      },
      {
        path: 'disable/:hash',
        component: RegistrationDisablePage,
        data: {
          showAside: false,
        },
      },
    ],
  },
  {
    path: 'authorization',
    children: [
      {
        path: '',
        component: AuthorizationComponent,
        data: {
          showAside: false,
        },
      },
      {
        path: 'forgot',
        component: ForgotPassowrdComponent,
        data: {
          showAside: false,
        },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
