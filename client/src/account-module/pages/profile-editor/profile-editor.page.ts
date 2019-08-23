import { Component } from '@angular/core';
import { PROFILE_SECTIONS } from '@account-module/consts/account-sections';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'ex-profile-editor',
    styleUrls: ['profile-editor.page.scss'],
    templateUrl: 'profile-editor.page.html'
})

export class ProfileEditorPage {
    public readonly MENU_ITEMS = PROFILE_SECTIONS;
    public form = new FormGroup({
        firstname: new FormControl(null, [Validators.required]),
        secondname: new FormControl(null, [Validators.required]),
    });

    public async saveProfile(): Promise<void> {
        if (this.form.valid) {

        }
    }
}
