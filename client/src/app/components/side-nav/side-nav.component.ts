import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { ApplicationService } from '@app/services/app.service';

@Component({
    selector: 'ex-side-nav',
    templateUrl: 'side-nav.component.html',
    styleUrls: ['side-nav.component.scss']
})

export class SideNavComponent {
    public readonly MENU = MENU_ITEMS;
    public visible: boolean;

    constructor(private appSrv: ApplicationService) {
        this.appSrv.$sideNavState.subscribe(state => this.visible = state);
    }

}
