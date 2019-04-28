import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesItem } from '@app/classes/categories';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ex-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent {
  public categoriesItems: CategoriesItem[] = [];
  @Input() public showMenu: boolean;
  @Input() public catalogName: string;
  @Input() public currentpage: number;

  public leftDec = 1;
  public widthDec: number;

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute
  ) {
    this.actRouter.params.subscribe(params => this.calcDecorator(params.cat));
  }

  @Input() set categories(items: CategoriesItem[]) {
    this.categoriesItems = items;
    const param = this.router.url.split('/')[2];
    this.calcDecorator(param);
  }

  public calcDecorator(category: string): void {
    let isFind = false;
    let offsetLeft = 0;
    this.categoriesItems.forEach((item, i) => {
      if (category === item.categoryRoute) {
        this.widthDec = item.itemWidth;
        isFind = true;
      }
      if (!isFind) {
        offsetLeft += item.itemWidth;
      }
    });
    this.leftDec = offsetLeft;
  }
}
