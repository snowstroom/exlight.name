import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesItem } from '@app/classes/categories';

@Component({
  selector: 'ex-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent {
  public categoryItems: CategoriesItem[] = [];
  @Input() public showMenu: boolean;
  @Input() public catalogName: string;
  @Input() public currentpage: number;
  @Output() public selectedCat = new EventEmitter<CategoriesItem>();
  private defItem = new CategoriesItem({
    id: undefined,
    categoryName: 'Все',
    categoryRoute: 'all'
  });

  constructor() {
    this.defItem.isActive = true;
    this.categoryItems = [this.defItem];
  }

  @Input() set categories(cats: CategoriesItem[]) {
    cats.forEach(item => item.isActive = false);
    this.categoryItems = [this.defItem, ...cats];
  }

  public selectCategory(category: CategoriesItem): void {
    this.categoryItems.forEach(item => item.isActive = false);
    category.isActive = true;
    this.selectedCat.next(category);
  }
}
