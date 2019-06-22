import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from '@core/classes';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article, IArticle } from '@article-module/models/article';
import { CarouselItem, ICarouselItem } from '@app/classes/carousel-item';
import { EnviromentService } from '@app/services/envirement.service';
import { ApiNamespace as API } from '@share/';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends Api {
  public pagination = new PaginationParams({ limit: 5 });
  private carouselItems$ = new BehaviorSubject<CarouselItem[]>([]);
  private carouselItems: CarouselItem[] = [];

  constructor(
    injector: Injector,
    envSrv: EnviromentService
  ) {
    super(injector, envSrv.API_DOMAIN);
    this.initCarousel();
  }

  get $carouselItems(): Observable<CarouselItem[]> {
    return this.carouselItems$.asObservable();
  }

  public async getArticles(pagination: PaginationParams, catId?: number): Promise<Article[]> {
    try {
      const params = pagination.getUrlString();
      const catParams = catId ? `&category_id=${catId}` : '';
      const answ: API.IPaginationContent<IArticle> = await this.get<API.IPaginationContent<IArticle>>(`article/list${params}${catParams}`);
      this.pagination.total = answ.count;
      return answ.content.map(art => new Article(art));
    } catch (err) {
      return [];
    }
  }

  public async getArticle(id: number): Promise<Article> {
    try {
      const answ: IArticle = await this.get<IArticle>(`article/item/${id}`);
      return new Article(answ);
    } catch (err) {
      return new Article();
    }
  }

  public async getArticleByRoute(route: string): Promise<Article> {
    try {
      const answ: IArticle = await this.get<IArticle>(`article/item?route=${route}`);
      return new Article(answ);
    } catch (err) {
      return new Article();
    }
  }

  public async getCarouselItems(): Promise<CarouselItem[]> {
    try {
      const answ: ICarouselItem[] = await this.get<ICarouselItem[]>('carousel-items');
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
