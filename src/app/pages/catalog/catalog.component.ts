import { Component, OnInit } from '@angular/core';
import { ArticleStateService } from '../../services/article-state.service';
import { Article } from '../../interfaces/ArticleApiData.interface';
import { ITEMS_ON_PAGE_ART } from '../../consts/ItemsOnPage.const';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public page: number;
  public articles: Article[] = [];
  public total = 0;
  public itemsOnPage = ITEMS_ON_PAGE_ART;
  constructor(
    private artStateSrv: ArticleStateService
  ) { }

  ngOnInit() {
    this.artStateSrv.articles$.subscribe(articles => this.articles = articles);
    this.artStateSrv.totalarticles$.subscribe(total => this.total = total);
    this.artStateSrv.page$.subscribe(page => this.page = page);
  }

  public setActivePage(page: number) {
    this.artStateSrv.curPage = page;
  }

}
