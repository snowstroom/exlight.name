import { IExlightRoute } from '@app/interfaces/exlight-router';
import { ProfileEditorComponent } from './components/profile-editor/profile-editor.component';
import { AccountSettingsComponent } from './components/settings-editor/settings-editor.component';

export const ARTICLE_ROUTES: IExlightRoute[] = [
    {
        path: 'profile',
        component: ProfileEditorComponent,
    }, {
        path: 'settings',
        component: AccountSettingsComponent,
    }
];
