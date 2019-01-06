import { Injectable } from '@angular/core';
import { ISliderItem } from '../classes/slider-item.class';
import { IArticle, IArticleApiData } from '../classes/article.class';
import { IPhotoItem } from '../classes/photo-item.class';
import { TrackApiData } from '../interfaces/TrackApiData.interface';
import { MediaItem } from '../interfaces/MediaItem.interface';
import { CategoriesItem, ICategoriesItem } from '../classes/categories.class';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { }

  public getSliderData(): Promise<ISliderItem[]> {
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

  public getArticles(start: number, end: number, categoryId?: string): Promise<IArticleApiData> {
    return Promise.resolve({
      totalItems: 42,
      articles: [{
        id: 1,
        date: '22.05.2018',
        views: 2,
        category: 3,
        title: 'Какой то тайтл',
        discription: 'Какое то описание',
        article: 'Контент статьи',
        route: 'title-1'
      }, {
        id: 1,
        date: '22.05.2018',
        views: 2,
        category: 3,
        title: 'Какой то тайтл',
        discription: 'Какое то описание',
        article: 'Контент статьи',
        route: 'title-2'
      }, {
        id: 1,
        date: '22.05.2018',
        views: 2,
        category: 3,
        title: 'Какой то тайтл',
        discription: 'Какое то описание',
        article: 'Контент статьи',
        route: 'title-3'
      }, {
        id: 1,
        date: '22.05.2018',
        views: 2,
        category: 3,
        title: 'Какой то тайтл',
        discription: 'Какое то описание',
        article: 'Контент статьи',
        route: 'title-4'
      }, {
        id: 1,
        date: '22.05.2018',
        views: 2,
        category: 3,
        title: 'Какой то тайтл',
        discription: 'Какое то описание',
        article: 'Контент статьи',
        route: 'title-5'
      }]
    });
  }

  public getTracks(): Promise<MediaItem[]> {
    return Promise.resolve([ {
      id: 1,
      type: 'music',
      coverUrl: '/assets/albom.jpg',
      fileUrl: '/assets/Элэм - Fools.mp3',
      performer: 'eXlight',
      name: 'По началу',
      discription: 'Ля ля ля ля',
      shows: 256
    }, {
      id: 2,
      type: 'music',
      coverUrl: '/assets/albom.jpg',
      fileUrl: '/assets/Элэм - Forgive.mp3',
      performer: 'eXlight',
      name: 'По началу',
      discription: '',
      shows: 256
    } ]);
  }

  public getCategoies(): Promise<ICategoriesItem[]> {
    return Promise.resolve([
      {
        id: 1,
        name: 'Музыка',
        route: 'music'
      }, {
        id: 2,
        name: 'Блог',
        route: 'blog'
      }, {
        id: 3,
        name: 'Разработка',
        route: 'develop'
      }, {
        id: 4,
        name: 'Стихи',
        route: 'poems'
      }]);
  }

  public getPhotos(): Promise<IPhotoItem[]> {
    return Promise.resolve([ {
        id: 1,
        description: 'Самая расчудесная фотография',
        url: 'assets/slider_1.jpg',
        shows: 102
      }, {
        id: 1,
        description: 'Самая расчудесная',
        url: 'assets/slider_1.jpg',
        shows: 102
      } ]);
  }
}
