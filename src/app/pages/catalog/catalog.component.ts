import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStateService } from '../../services/article-state.service';
import { Article } from '../../interfaces/ArticleApiData.interface';
import { ITEMS_ON_PAGE_ART } from '../../consts/ItemsOnPage.const';
import { Title, Meta } from '@angular/platform-browser';
import { CategoriesApiData } from '../../interfaces/CategoriesApiData.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public page: number;
  public cat: string;
  public articles: Article[] = [];
  public categories: CategoriesApiData[];
  public total = 0;
  public itemsOnPage = ITEMS_ON_PAGE_ART;
  constructor(
    private artStateSrv: ArticleStateService,
    private router: Router,
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXlight - Каталог статей');
    this.artStateSrv.categories$.subscribe(categories => this.categories = categories);
    this.artStateSrv.articles$.subscribe(articles => this.articles = articles);
    this.artStateSrv.totalarticles$.subscribe(total => this.total = total);
    this.artStateSrv.category$.subscribe(cat => {
      this.cat = cat;
      this.router.navigate(['/catalog/' + this.cat + '/page', 1]);
    });
    this.artStateSrv.page$.subscribe(page => {
      this.page = page;
      this.router.navigate(['/catalog/' + this.cat + '/page', this.page]);
    });
  }

  public setActivePage(page: number) {
    this.artStateSrv.curPage = page;
  }

  public selectedCatHandler(category: string) {
    this.artStateSrv.curCat = category;
  }

}
