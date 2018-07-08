import { Component, OnInit } from '@angular/core';
import { ArticleStateService } from '../../services/article-state.service';
import { ArticleApiData } from '../../interfaces/ArticleApiData.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public articles: ArticleApiData[] = [];
  constructor(
    private artStateSrv: ArticleStateService
  ) { }

  ngOnInit() {
    this.artStateSrv.articles$.subscribe(articles => this.articles = articles);
  }

  public setActivePage(page: number) {
    this.artStateSrv.curPage = page;
  }

}
