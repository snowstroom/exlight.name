import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public categories: CategoriesItem[] = [];
  public itemsOnPage = ITEMS_ON_PAGE_ART;
  constructor(
    public articlesSrv: ArticleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.articlesSrv.$categories.subscribe(categories => {
        if (categories.length) {
          this.categories = categories;
          this.articlesSrv.pagination.currentPage = params.page;
          this.curCategory = this.articlesSrv.categoriesMap.get(params.cat);
          this.categories.forEach(item => item.isActive = false);
          this.curCategory.isActive = true;
          this.articlesSrv.getArticles(this.articlesSrv.pagination, this.curCategory.id)
            .then(articles => this.articles = articles);
        }
      });
    });
  }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - Каталог статей');
  }

  public setActivePage(page: number): void {
    this.articlesSrv.pagination.page = page;
  }

  public async selectedCatHandler(cat: CategoriesItem): Promise<void> {

    this.router.navigate(['catalog', cat.categoryRoute, 'page', 1]);
  }

  public navigateToArticle(route: string): void {
    this.router.navigate(['article', this.curCategory.categoryRoute, route]);
  }

}
