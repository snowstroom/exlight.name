import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ArticleApiData, Article } from '../interfaces/ArticleApiData.interface';
import { CategoriesApiData } from '../interfaces/CategoriesApiData.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITEMS_ON_PAGE_ART } from '../consts/ItemsOnPage.const';


@Injectable({
  providedIn: 'root'
})
export class ArticleStateService {
  private articles: Article[] = [];
  private categories: CategoriesApiData[] = [];
  private currentPage = 1;
  private currentCategory: number = null;
  private totalArticles: number = null;
  private isLoad = false;
  private _categories$ = new BehaviorSubject(this.categories);
  private _totalArticles$ = new BehaviorSubject(null);
  private _page$ = new BehaviorSubject(this.currentPage);
  private _category$ = new BehaviorSubject(this.currentCategory);
  private _articles$ = new BehaviorSubject(this.articles);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getArticles(this.curPage, this.curPage * ITEMS_ON_PAGE_ART)
      .then((data: ArticleApiData) => {
          this.articles = data.articles;
          this.totalArticles = data.totalItems;
          this._totalArticles$.next(this.totalArticles);
          this._articles$.next(this.articles);
      }).catch(err => console.log(err));
    this.apiSrv.getCategoies()
      .then((data: CategoriesApiData[]) => {
        this.categories = data;
        this._categories$.next(data);
      });
  }

  get articles$(): Observable<Article[]> {
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

  get totalarticles$(): Observable<number> {
    return this._totalArticles$.asObservable();
  }

  set curPage(page: number) {
    this.isLoad = true;
    this.apiSrv.getArticles(this.curPage, this.curPage * ITEMS_ON_PAGE_ART, this.curCat)
      .then(data => {
        this.isLoad = false;
        this.currentPage = page;
        this.totalArticles = data.totalItems;
        this.articles = data.articles;
        this._page$.next(this.currentPage);
        this._totalArticles$.next(this.totalArticles);
        this._articles$.next(this.articles);
      }).catch(err => {
        this._page$.next(this.curPage);
        this.isLoad = false;
      });
  }

  set curCat(catId: number) {
    this.isLoad = true;
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
      });
  }

}
