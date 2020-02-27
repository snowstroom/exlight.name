import { Component } from '@angular/core';
import { PROFILE_SECTIONS } from '@account-module/consts/account-sections';

@Component({
  selector: 'ex-settings',
  templateUrl: 'settings-editor.page.html',
  styleUrls: ['settings-editor.page.scss'],
})
export class AccountSettingsPage {
  public readonly MENU_ITEMS = PROFILE_SECTIONS;
}
