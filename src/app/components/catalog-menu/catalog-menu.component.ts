import { Component, OnInit } from '@angular/core';
import { CategoriesApiData } from '../../interfaces/CategoriesApiData.interface';
import { ArticleStateService } from '../../services/article-state.service';

@Component({
  selector: 'app-catalog-menu',
  templateUrl: './catalog-menu.component.html',
  styleUrls: ['./catalog-menu.component.scss']
})
export class CatalogMenuComponent implements OnInit {
  public selectCat: number = null;
  public categories: CategoriesApiData[] = [];
  public currentpage = 1;

  constructor(
    private artStateSrv: ArticleStateService
  ) { }

  ngOnInit() {
    this.artStateSrv.categories$.subscribe(categories => this.categories = categories);
    this.artStateSrv.page$.subscribe(page => this.currentpage = page);
  }

  public selectCategory(i: number) {
    this.selectCat = i;
    this.artStateSrv.curCat = i;
  }
}
