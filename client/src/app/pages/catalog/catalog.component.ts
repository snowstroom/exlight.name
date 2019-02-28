import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ITEMS_ON_PAGE_ART } from '../../consts/ItemsOnPage.const';
import { Title, Meta } from '@angular/platform-browser';
import { CategoriesItem } from '@app/classes/categories';
import { Article } from '@app/classes/article';

@Component({
  selector: 'ex-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public page: number;
  public curCategory: CategoriesItem;
  public articles: Article[] = [];
  public categories: CategoriesItem[];
  public itemsOnPage = ITEMS_ON_PAGE_ART;
  constructor(
    private articlesSrv: ArticleService,
    private router: Router,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.articlesSrv.$categories
      .subscribe(categories => this.categories = categories);
    this.articlesSrv.getArticles(this.articlesSrv.pagination)
      .then(articles => this.articles = articles);
  }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - Каталог статей');
  }

  public setActivePage(page: number): void {
    this.articlesSrv.pagination.page = page;
  }

  public async selectedCatHandler(cat: CategoriesItem): Promise<void> {
    this.curCategory = cat;
    this.articles = await this.articlesSrv.getArticles(this.articlesSrv.pagination, cat.id);
  }

  public navigateToArticle(route: string): void {
    this.router.navigate(['article', this.curCategory.categoryRoute, route]);
  }

}
