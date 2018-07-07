import { Injectable } from '@angular/core';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
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
    return Promise.reolve([{
      title: 'Какая то интересная новость',
      data: 'Какая то интересная информация об этой новости',
      urlImg: 'slider_1.jpg',
      id: 2
    }]);
  }

  public getArticles(): Promise<null> {

  }
}
