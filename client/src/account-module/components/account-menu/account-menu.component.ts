import { Component } from '@angular/core';
import { ICONS } from '@account-module/consts/accounts-icons';

@Component({
    selector: 'ex-account-menu',
    styleUrls: ['account-menu.component.scss'],
    templateUrl: 'account-menu.component.html'
})

export class AccountMenuComponent {
    public readonly ICONS = ICONS;
}
