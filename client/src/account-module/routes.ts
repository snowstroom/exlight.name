import { IExlightRoute } from '@app/interfaces/exlight-router';
import { ProfileEditorPage } from './pages/profile-editor/profile-editor.page';
import { AccountSettingsPage } from './pages/settings-editor/settings-editor.page';
import { ArticlesPage } from './pages/articles/articles.page';
import { CreateArticlePage } from './pages/create-article/create-article.page';
import { GuardService } from '@app/services/guards/guard.service';
import { CategoriesManagePage } from './pages/categories-manage/categories-manage.page';
import { UserManagePage } from './pages/users-manage/users-manage.page';
import { AccessManagePage } from './pages/access-manage/access-manage.page';

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
            path: 'list/page/:page',
            component: ArticlesPage,
        }, {
            path: 'create',
            component: CreateArticlePage
        }]
    }, {
        path: 'categories-manage',
        children: [{
            path: '',
            component: CategoriesManagePage
        }]
    }, {
        path: 'user-manage',
        children: [{
            path: '',
            component: UserManagePage
        }]
    }, {
        path: 'access-manage',
        children: [{
            path: 'accesses',
            component: AccessManagePage
        }, {
            path: 'roles',
            component: AccessManagePage
        }]
    }]
}];
