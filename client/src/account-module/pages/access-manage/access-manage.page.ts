import { Component } from '@angular/core';
import { ACCESSES_SECTION } from '@account-module/consts/account-sections';

@Component({
    templateUrl: 'access-manage.page.html'
})
export class AccessManagePage {
    public readonly MENU_ITEMS = ACCESSES_SECTION;
}
