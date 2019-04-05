import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { ApplicationService } from '@app/services/app.service';
import { faBars } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public readonly MENU_ICO = faBars;
  public readonly menuItems = MENU_ITEMS;
  public leftDec: number;

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
  }

  public openMobileMenu(): void {
    console.warn('open mobile menu');
  }

}
