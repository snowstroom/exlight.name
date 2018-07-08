import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ArticleApiData } from '../interfaces/ArticleApiData.interface';
import { CategoriesApiData } from '../interfaces/CategoriesApiData.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleStateService {
  private articles: ArticleApiData[] = [];
  private categories: CategoriesApiData[] = [];
  private currentPage = 1;
  private currentCategory: number = null;
  private _categories$ = new BehaviorSubject(this.categories);
  private _page$ = new BehaviorSubject(this.currentPage);
  private _category$ = new BehaviorSubject(this.currentCategory);
  private _articles$ = new BehaviorSubject(this.articles);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getArticles()
      .then((data: ArticleApiData[]) => {
          this.articles = data;
          this._articles$.next(data);
      }).catch(err => console.log(err));
    this.apiSrv.getCategoies()
      .then((data: CategoriesApiData[]) => {
        this.categories = data;
        this._categories$.next(data);
      });
  }

  get articles$(): Observable<ArticleApiData[]> {
    return this._articles$.asObservable();
  }

  get categories$(): Observable<CategoriesApiData[]> {
    return this._categories$.asObservable();
  }

  get page$(): Observable<number> {
    return this._page$.asObservable();
  }

  get category$(): Observable<number> {
    return this._category$.asObservable();
  }

  set curPage(page: number) {
    this._page$.next(page);
    this.currentPage = page;
  }

  set curCat(catId: number) {
    this.curPage = 1;
    this._category$.next(catId);
    this.currentCategory = catId;
  }

}
