import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { ApplicationService } from '@app/services/app.service';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public readonly menuItems = MENU_ITEMS;
  public leftDec: number;
  public isFixed = 'static';

  constructor(
    private activatedRoute: Router,
    private appSrv: ApplicationService
  ) {
    this.activatedRoute.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe((e: NavigationStart) => {
        const urlParts = e.url.split('/');
        this.menuItems.forEach((item, i) => {
          if (item.route[0] === urlParts[1]) {
            item.active = true;
            this.leftDec = 85 * i || 1;
          }
        });
      });
      this.appSrv.$scroll.subscribe(scroll => {
        if (scroll < 50) {
          this.isFixed = 'static';
        }
        if (scroll > 50) {
          this.isFixed = 'fixed';
        }
      });
  }

}
