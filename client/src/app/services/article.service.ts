import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from 'core/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CategoriesItem, ICategoriesItem } from '@app/classes/categories';
import { Article, IArticle } from '@app/classes/article';
import { CarouselItem, ICarouselItem } from '@app/classes/carousel-item';
import { IPaginationContent } from '@app/interfaces/pagination-content';

const DEF_CAT: ICategoriesItem = {
  id: undefined,
  categoryName: 'Все',
  categoryRoute: 'all'
};
@Injectable({
  providedIn: 'root'
})
export class ArticleService extends Api {
  public readonly DEF_CAT = new CategoriesItem(DEF_CAT);
  public pagination = new PaginationParams({ limit: 5 });
  public categoriesMap = new Map<string, CategoriesItem>();
  private categories$ = new BehaviorSubject<CategoriesItem[]>([]);
  private carouselItems$ = new BehaviorSubject<CarouselItem[]>([]);
  private categories: CategoriesItem[] = [];
  private carouselItems: CarouselItem[] = [];

  constructor(injector: Injector) {
    super(injector, environment.domain);
    this.DEF_CAT.isActive = true;
    this.getCategories().then(categories => {
      this.categories = [this.DEF_CAT, ...categories];
      this.initCategoriesMap(this.categories);
      this.categories$.next(this.categories);
    });

    this.getCarouselItems().then(items => {
      this.carouselItems = items;
      this.carouselItems$.next(this.carouselItems);
    });
  }

  get $categories(): Observable<CategoriesItem[]> {
    return this.categories$.asObservable();
  }

  get $carouselItems(): Observable<CarouselItem[]> {
    return this.carouselItems$.asObservable();
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
      const answ: IPaginationContent<IArticle> = await this.post('articles', {
        ...pagination.getParamsObject(),
        categoryId: catId
      });
      this.pagination.total = answ.count;
      return answ.content.map(art => new Article(art));
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

  public async getCarouselItems(): Promise<CarouselItem[]> {
    try {
      const answ: ICarouselItem[] = await this.get('carousel-items');
      return answ.map(item => new CarouselItem(item));
    } catch (err) {
      return [];
    }
  }

  private initCategoriesMap(categories: CategoriesItem[]): void {
    categories.forEach(c => this.categoriesMap.set(c.categoryRoute, c));
  }

}
