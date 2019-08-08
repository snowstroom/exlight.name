import { Component, Input } from '@angular/core';
import { ICategory } from '@account-module/interfaces/category';

@Component({
    selector: 'ex-account-page-wrapper',
    styleUrls: ['account-page-wrapper.component.scss'],
    templateUrl: 'account-page-wrapper.component.html'
})

export class AccountPageWrapperComponent {
    @Input() public sectionName: string;
    @Input() public menuItems: ICategory[] = [];
}
