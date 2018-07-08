import { Injectable } from '@angular/core';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
import { ArticleApiData } from '../interfaces/ArticleApiData.interface';
import { TrackApiData } from '../interfaces/TrackApiData.interface';
import { CategoriesApiData } from '../interfaces/CategoriesApiData.interface';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getSliderData(): Promise<SliderApiData[]> {
    return Promise.resolve([{
      id: 2,
      title: 'Какая то интересная новость',
      data: 'Какая то интересная информация об этой новости',
      urlImg: '/assets/slider_1.jpg'
    }, {
      id: 2,
      title: 'Какая то интересная новость 2',
      data: 'Какая то интересная информация об этой новости',
      urlImg: '/assets/slider_1.jpg'
    }, {
      id: 2,
      title: 'Какая то интересная новость 3',
      data: 'Какая то интересная информация об этой новости',
      urlImg: '/assets/slider_1.jpg'
    }]);
  }

  public getArticles(): Promise<ArticleApiData[]> {
    return Promise.resolve([{
      id: 1,
      date: '22.05.2018',
      views: 2,
      category: 3,
      title: 'Какой то тайтл',
      discription: 'Какое то описание',
      article: 'Контент статьи',
    }, {
      id: 1,
      date: '22.05.2018',
      views: 2,
      category: 3,
      title: 'Какой то тайтл',
      discription: 'Какое то описание',
      article: 'Контент статьи',
    }, {
      id: 1,
      date: '22.05.2018',
      views: 2,
      category: 3,
      title: 'Какой то тайтл',
      discription: 'Какое то описание',
      article: 'Контент статьи',
    }, {
      id: 1,
      date: '22.05.2018',
      views: 2,
      category: 3,
      title: 'Какой то тайтл',
      discription: 'Какое то описание',
      article: 'Контент статьи',
    }, {
      id: 1,
      date: '22.05.2018',
      views: 2,
      category: 3,
      title: 'Какой то тайтл',
      discription: 'Какое то описание',
      article: 'Контент статьи',
    }
  ]);
  }

  public getTracks(): Promise<TrackApiData[]> {
    return Promise.resolve([]);
  }

  public getCategoies(): Promise<CategoriesApiData[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Музыка'
      }, {
        id: 2,
        name: 'Блог'
      }, {
        id: 3,
        name: 'Разработка'
      }, {
        id: 4,
        name: 'Стихи'
      } ]);
  }
}
