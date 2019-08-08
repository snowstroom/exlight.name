import { Component } from '@angular/core';
import { PROFILE_SECTIONS } from '@account-module/consts/account-sections';

@Component({
    selector: 'ex-profile-editor',
    styleUrls: ['profile-editor.page.scss'],
    templateUrl: 'profile-editor.page.html'
})

export class ProfileEditorPage {
    public readonly MENU_ITEMS = PROFILE_SECTIONS;
}
