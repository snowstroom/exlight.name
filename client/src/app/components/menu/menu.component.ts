import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';
import { filter } from 'rxjs/operators';
import { Router, NavigationStart, UrlSerializer } from '@angular/router';

@Component({
  selector: 'ex-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public readonly menuItems = MENU_ITEMS;
  public widthDec = 40;
  public leftDec = 0;

  constructor(private activatedRoute: Router, private urlSer: UrlSerializer) {
    this.activatedRoute.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe(e => console.warn(e));
      console.warn(this.urlSer);
  }

  public ngOnInit(): void {
  }

  public moveDecorator(e: any): void {
    this.leftDec = e.target.offsetLeft;
    this.widthDec = e.target.clientWidth;
    // console.warn({ target: e.target });
  }

}
