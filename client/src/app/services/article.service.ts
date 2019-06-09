import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from 'core/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { CategoriesItem, ICategoriesItem } from '@app/classes/categories';
import { Article, IArticle } from '@app/classes/article';
import { CarouselItem, ICarouselItem } from '@app/classes/carousel-item';
import { IPaginationContent } from '@app/interfaces/pagination-content';
import { CAT_ROUTE_TEMPLATE } from '@app/consts/urls';

const DEF_CAT: ICategoriesItem = {
  id: undefined,
  categoryName: 'Все',
  categoryRoute: 'all'
};

@Injectable()
export class ArticleService extends Api {
  public readonly DEF_CAT = new CategoriesItem(DEF_CAT, CAT_ROUTE_TEMPLATE);
  public pagination = new PaginationParams({ limit: 5 });
  public categoriesMap = new Map<string, CategoriesItem>();
  private categories$ = new BehaviorSubject<CategoriesItem[]>([]);
  private carouselItems$ = new BehaviorSubject<CarouselItem[]>([]);
  private categories: CategoriesItem[] = [];
  private carouselItems: CarouselItem[] = [];

  constructor(injector: Injector) {
    super(injector, environment.domain);
    this.initCategories();
    this.initCarousel();
  }

  get $categories(): Observable<CategoriesItem[]> {
    return this.categories$.asObservable();
  }

  get $carouselItems(): Observable<CarouselItem[]> {
    return this.carouselItems$.asObservable();
  }

  public async getCategories(): Promise<CategoriesItem[]> {
    try {
      const answ: ICategoriesItem[] = await this.get('category/all');
      return answ.map(item => new CategoriesItem(item, CAT_ROUTE_TEMPLATE));
    } catch (err) {
      return [];
    }
  }

  public async getArticles(pagination: PaginationParams, catId?: number): Promise<Article[]> {
    try {
      const params = pagination.getUrlString();
      const answ: IPaginationContent<IArticle> = await this.get(`article/list${params}&category_id=${catId}`);
      this.pagination.total = answ.count;
      return answ.content.map(art => new Article(art));
    } catch (err) {
      return [];
    }
  }

  public async getArticle(id: number): Promise<Article> {
    try {
      const answ: IArticle = await this.get(`article/item/${id}`);
      return new Article(answ);
    } catch (err) {
      return null;
    }
  }

  public async getArticleByRoute(route: string): Promise<Article> {
    try {
      const answ: IArticle = await this.get(`article/item?route=${route}`);
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

  private async initCategories(): Promise<void> {
    this.DEF_CAT.isActive = true;
    const categories = await this.getCategories();
    this.categories = [this.DEF_CAT, ...categories];
    this.initCategoriesMap(this.categories);
    this.categories$.next(this.categories);
  }

  private async initCarousel(): Promise<void> {
    this.carouselItems = await this.getCarouselItems();
    this.carouselItems$.next(this.carouselItems);
  }

}
