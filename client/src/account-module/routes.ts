import { IExlightRoute } from '@app/interfaces/exlight-router';
import { ProfileEditorPage } from './pages/profile-editor/profile-editor.page';
import { AccountSettingsPage } from './pages/settings-editor/settings-editor.page';

export const ACCOUNT_ROUTES: IExlightRoute[] = [{
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'profile'
}, {
    path: 'profile',
    component: ProfileEditorPage
}, {
    path: 'settings',
    component: AccountSettingsPage
}];
