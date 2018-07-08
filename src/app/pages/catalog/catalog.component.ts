import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state.service';
import { ArticleApiData } from '../../interfaces/ArticleApiData.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public articles: ArticleApiData[] = [];
  constructor(
    private appStateSrv: AppStateService
  ) { }

  ngOnInit() {
    this.appStateSrv.articles$.subscribe(articles => this.articles = articles);
  }

}
