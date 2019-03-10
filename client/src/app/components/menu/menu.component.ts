import { Component } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public readonly menuItems = MENU_ITEMS;
  public leftDec: number;

  constructor(private activatedRoute: Router) {
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

}
