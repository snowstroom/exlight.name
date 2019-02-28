import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoriesItem } from '@app/classes/categories';

@Component({
  selector: 'ex-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit {
  @Input() public showMenu: boolean;
  @Input() public catalogName: string;
  @Input() public categories: CategoriesItem[] = [];
  @Input() public currentpage: number;
  @Output() public selectedCat = new EventEmitter();

  public ngOnInit(): void { }

  public selectCategory(route: string): void {
  }
}
