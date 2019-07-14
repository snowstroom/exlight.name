import { Component } from '@angular/core';
import { CatalogMenuComponent } from '@common-module/components/catalog-menu/catalog-menu.component';

@Component({
    selector: 'ex-account-head',
    templateUrl: 'account-head.component.html',
    styleUrls: ['account-head.component.scss']
})

export class AccountHeadComponent extends CatalogMenuComponent { }
