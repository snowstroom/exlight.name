import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from 'core/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Article, IArticle } from 'article-module/models/article';
import { CarouselItem, ICarouselItem } from '@app/classes/carousel-item';
import { IPaginationContent } from '@app/interfaces/pagination-content';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends Api {
  public pagination = new PaginationParams({ limit: 5 });
  private carouselItems$ = new BehaviorSubject<CarouselItem[]>([]);
  private carouselItems: CarouselItem[] = [];

  constructor(injector: Injector) {
    super(injector, environment.domain);
    this.initCarousel();
  }

  get $carouselItems(): Observable<CarouselItem[]> {
    return this.carouselItems$.asObservable();
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

  private async initCarousel(): Promise<void> {
    this.carouselItems = await this.getCarouselItems();
    this.carouselItems$.next(this.carouselItems);
  }

}
