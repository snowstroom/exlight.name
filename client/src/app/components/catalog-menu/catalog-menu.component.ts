import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesItem } from '@app/classes/categories';

@Component({
  selector: 'ex-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent {
  @Input() public categories: CategoriesItem[] = [];
  @Input() public showMenu: boolean;
  @Input() public catalogName: string;
  @Input() public currentpage: number;
  @Output() public selectedCat = new EventEmitter<CategoriesItem>();

  public selectCategory(category: CategoriesItem): void {
    this.selectedCat.emit(category);
  }
}
