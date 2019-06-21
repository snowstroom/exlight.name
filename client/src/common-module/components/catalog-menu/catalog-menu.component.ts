import { Component, Input } from '@angular/core';
import { CategoriesItem } from '@article-module/models/categories';
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

  public active: number;

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
    this.active = this.categoriesItems.findIndex(item => category === item.route);
  }
}
