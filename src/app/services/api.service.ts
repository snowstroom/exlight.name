import { Injectable } from '@angular/core';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
import { ArticleApiData } from '../interfaces/ArticleApiData.interface';
import { Http } from '@angular/http';
import { Promise } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getSliderData(): Promise<SliderApiData[]> {
    return Promise.resolve([{
      title: 'Какая то интересная новость',
      data: 'Какая то интересная информация об этой новости',
      urlImg: 'slider_1.jpg',
      id: 2
    }]);
  }

  public getArticles(): Promise<ArticleApiData> {
    return Promise.resolve([
      {
        id: 1,
        title: 'Какой то тайтл',
        discription: 'Какое то описание статьи',
        articele: 'Какое то содержание статьи',
        views: 21,
        category: 3
      }
    ]);
  }
}
