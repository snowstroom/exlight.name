import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '@app/consts/menu-items';

@Component({
  selector: 'ex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public readonly MENU = MENU_ITEMS;
  public year = new Date().getFullYear();
  constructor() { }

  public ngOnInit(): void {
  }

}
