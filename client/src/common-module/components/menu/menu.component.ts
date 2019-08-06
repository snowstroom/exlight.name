import { Component, Input, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { faBars } from '@fortawesome/fontawesome-free-solid';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public menuItems = [];
  @Output() public sidenavToogle = new EventEmitter();
  public readonly MENU_ICO = faBars;
  public active: number;

  constructor(private activatedRoute: Router) {
    this.activatedRoute.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe((e: NavigationStart) => {
        const urlParts = e.url.split('/');
        this.menuItems.forEach((item, i) => {
          if (item.route[0] === urlParts[1]) {
            this.active = i;
            item.active = true;
          }
        });
      });
  }

  public openMobileMenu(e: MouseEvent): void {
    e.stopPropagation();
    this.sidenavToogle.emit();
  }

}
