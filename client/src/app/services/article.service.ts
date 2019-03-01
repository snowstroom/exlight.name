import { Injectable, Injector } from '@angular/core';
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
  public categoriesMap = new Map<string, CategoriesItem>();
  private categories: CategoriesItem[] = [];
  private categories$ = new BehaviorSubject<CategoriesItem[]>([]);
  constructor(injector: Injector) {
    super(injector, environment.domain);
    const defCat = new CategoriesItem({
      id: undefined,
      categoryName: 'Все',
      categoryRoute: 'all'
    });
    defCat.isActive = true;
    this.getCategories().then(categories => {
      this.categories = [defCat, ...categories];
      this.initCategoriesMap(this.categories);
      this.categories$.next(this.categories);
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

  public async getArticles(pagination: PaginationParams, catId?: number): Promise<Article[]> {
    try {
      const answ: IArticle[] = await this.post('articles', {
        ...pagination.getParamsObject(),
        categoryId: catId
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

  public async getArticleByRoute(route: string): Promise<Article> {
    try {
      const answ: IArticle = await this.get(`article-by-route/${route}`);
      return new Article(answ);
    } catch (err) {
      return null;
    }
  }

  private initCategoriesMap(categories: CategoriesItem[]): void {
    categories.forEach(c => this.categoriesMap.set(c.categoryRoute, c));
  }

  get $categories(): Observable<any[]> {
    return this.categories$.asObservable();
  }

}
