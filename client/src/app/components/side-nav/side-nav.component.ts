import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { ApplicationService } from '@app/services/app.service';
import { E_SCREEN_TYPE } from '@app/enums/screen-type';
import { EnviromentService } from '@app/services/envirement.service';

@Component({
    selector: 'ex-side-nav',
    templateUrl: 'side-nav.component.html',
    styleUrls: ['side-nav.component.scss']
})

export class SideNavComponent {
    public readonly MENU = MENU_ITEMS;
    public visible: boolean;

    constructor(
        private appSrv: ApplicationService,
        private envSrv: EnviromentService
    ) {
        this.appSrv.$sideNavState.subscribe(state => this.visible = state);
        this.envSrv.$screenType.subscribe(type => {
            if (type > 1) {
                this.appSrv.hideSideNav();
            }
        });
    }

    public hideSideNav(): void {
        this.appSrv.hideSideNav();
    }

}
