import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ITEMS_ON_PAGE_ART } from '../../consts/ItemsOnPage.const';
import { Title, Meta } from '@angular/platform-browser';
import { CategoriesItem } from '@app/classes/categories';

@Component({
  selector: 'ex-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public page: number;
  public cat: string;
  public articles: any[] = [];
  public categories: CategoriesItem[];
  public total = 0;
  public itemsOnPage = ITEMS_ON_PAGE_ART;
  constructor(
    private articlesSrv: ArticleService,
    private router: Router,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.articlesSrv.$categories
      .subscribe(categories => this.categories = categories);
  }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - Каталог статей');
  }

  public setActivePage(page: number): void {

  }

  public selectedCatHandler(cat: CategoriesItem): void {
    this.articlesSrv.getArticles(this.articlesSrv.pagination, cat);
  }

}
