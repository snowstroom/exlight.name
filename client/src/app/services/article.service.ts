import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Api, PaginationParams } from 'core/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ITEMS_ON_PAGE_ART } from '../consts/ItemsOnPage.const';
import { CategoriesItem, ICategoriesItem } from '@app/classes/categories';
import { Article, IArticle } from '@app/classes/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends Api {
  public pagination = new PaginationParams({ limit: 10 });
  private articles: any[] = [];
  private categories: CategoriesItem[] = [];
  private curCat: number;
  private categories$ = new BehaviorSubject<CategoriesItem[]>([]);
  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    super(injector, environment.domain);
    this.router.events.subscribe(evt => console.warn(evt));
    this.getCategories().then(categories => {
      console.warn(categories);
      this.categories = categories;
      this.categories$.next(categories);
    });
  }

  public async getCategories(): Promise<CategoriesItem[]> {
    try {
      const answ: ICategoriesItem[] = await this.get('categories-of-articles');
      return answ.map(item => new CategoriesItem(item));
    } catch (err) {
      return [];
    }
  }

  public async getArticles(pagination: PaginationParams, cat: CategoriesItem): Promise<Article[]> {
    try {
      const answ: IArticle[] = await this.post('articles', {
        ...pagination.getParamsObject(),
        categoryId: cat.id
      });
      return answ.map(art => new Article(art));
    } catch (err) {
      return [];
    }
  }

  public async getArticle(id: number): Promise<Article> {
    try {
      const answ: IArticle = await this.get(`article/${id}`);
      return new Article(answ);
    } catch (err) {
      return null;
    }
  }

  get $categories(): Observable<any[]> {
    return this.categories$.asObservable();
  }

  set curCategory(catId: string) { /*
    this.apiSrv.getArticles(this.curPage, this.curPage * ITEMS_ON_PAGE_ART, this.curCat)
      .then(data => {
        this.curPage = 1;
        this.isLoad = false;
        this.currentCategory = catId;
        this.articles = data.articles;
        this.totalArticles = data.totalItems;
        this._totalArticles$.next(this.totalArticles);
        this._articles$.next(this.articles);
        this._category$.next(catId);
      }).catch(err => {
        this._category$.next(this.curCat);
        this.isLoad = false;
        console.log(err);
      });*/
  }

}
