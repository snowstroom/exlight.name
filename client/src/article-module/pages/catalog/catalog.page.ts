import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ITEMS_ON_PAGE_ART } from '../../../app/consts/ItemsOnPage.const';
import { CategoriesItem } from '@article-module/models/categories';
import { Article } from 'article-module/models/article';
import { numberParam } from '@core/functions/number-param';
import { ApplicationService } from '@app/services/app.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from '@article-module/services/categories.service';

@Component({
  selector: 'ex-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss']
})
export class CatalogPage implements OnDestroy {
  public wait = true;
  public curCategory: CategoriesItem = this.categoriesSrv.DEF_CAT;
  public page = 1;
  public articles: Article[] = [];
  public categories: CategoriesItem[] = [];
  public readonly PAGE_LENGTH = ITEMS_ON_PAGE_ART;
  private subscriber = new Subject();

  constructor(
    public articlesSrv: ArticleService,
    private categoriesSrv: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appSrv: ApplicationService
  ) {
    combineLatest(this.activatedRoute.params, this.categoriesSrv.$categories)
      .pipe(takeUntil(this.subscriber))
      .subscribe(([params, categories]) => {
        this.wait = true;
        this.initPage(params.page);
        this.initCategories(params.cat, categories);
        this.setPageInfo();
        this.getArticles();
      });
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
  }

  private async getArticles(): Promise<void> {
    if (this.curCategory) {
      this.articles = await this.articlesSrv.getArticles(this.articlesSrv.pagination, this.curCategory.id);
      this.wait = false;
    }
  }

  private initCategories(catURL: string, categories: CategoriesItem[]): void {
    this.categories = categories;
    this.curCategory = this.categoriesSrv.categoriesMap.get(catURL);
    if (this.curCategory) {
      this.categories.forEach(item => item.isActive = false);
      this.curCategory.isActive = true;
    } else {
      this.router.navigate(['catalog', this.categoriesSrv.DEF_CAT.route, 'page', 1]);
    }
  }

  private initPage(page: string): void {
    this.articlesSrv.pagination.page = numberParam(page);
    this.page = numberParam(page);
  }

  private setPageInfo(): void {
    this.appSrv.setPageInfo({
      description: 'Каталог статей. eXlight - блог разработчкиа о творчестве, музыке,\
       поэзии, программировании и событиях в жизни. ',
      img: '',
      keywords: this.categories.map(c => c.name),
      title: 'Каталог статей',
      url: ''
    });
  }

}
