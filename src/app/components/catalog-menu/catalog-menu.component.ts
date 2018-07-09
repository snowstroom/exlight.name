import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesApiData } from '../../interfaces/CategoriesApiData.interface';
import { ArticleStateService } from '../../services/article-state.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit {
  @Output() selectedCat = new EventEmitter();
  public selectCat: string = null;
  public categories: CategoriesApiData[] = [];
  public currentpage = 1;

  constructor(
    private artStateSrv: ArticleStateService
  ) { }

  ngOnInit() {
    this.artStateSrv.categories$.subscribe(categories => this.categories = categories);
    this.artStateSrv.page$.subscribe(page => this.currentpage = page);
  }

  public selectCategory(route: string) {
    this.selectCat = route;
    this.artStateSrv.curCat = route;
  }
}
