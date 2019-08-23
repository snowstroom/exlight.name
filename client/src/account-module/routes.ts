import { IExlightRoute } from '@app/interfaces/exlight-router';
import { ProfileEditorPage } from './pages/profile-editor/profile-editor.page';
import { AccountSettingsPage } from './pages/settings-editor/settings-editor.page';
import { ArticlesPage } from './pages/articles/articles.page';
import { CreateArticlePage } from './pages/create-article/create-article.page';
import { GuardService } from '@app/services/guards/guard.service';

export const ACCOUNT_ROUTES: IExlightRoute[] = [{
    path: 'account',
    canActivate: [GuardService],
    children: [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    }, {
        path: 'profile',
        children: [{
            path: '',
            component: ProfileEditorPage
        }, {
            path: 'settings',
            component: AccountSettingsPage
        }]
    }, {
        path: 'articles',
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'create',
        }, {
            path: 'list',
            component: ArticlesPage,
        }, {
            path: 'create',
            component: CreateArticlePage
        }]
    }]
},
];
