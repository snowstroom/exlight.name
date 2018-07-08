import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
import { TrackApiData } from '../interfaces/TrackApiData.interface';
import { CategoriesApiData } from '../interfaces/CategoriesApiData.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private slider: SliderApiData[] = [];
  private traks: TrackApiData[] = [];
  private categories: CategoriesApiData[] = [];
  private _slider$ = new BehaviorSubject(this.slider);
  private _traks$ = new BehaviorSubject(this.traks);
  private _categories$ = new BehaviorSubject(this.categories);
  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getSliderData()
      .then((data: SliderApiData[]) => {
        this.slider = data;
        this._slider$.next(this.slider);
      }).catch(err => console.log(err));
    this.apiService.getTracks()
      .then((data: TrackApiData[]) => {
          this.traks = data;
          this._traks$.next(data);
      }).catch(err => console.log(err));
    this.apiService.getCategoies()
      .then((data: CategoriesApiData[]) => {
        this.categories = data;
        this._categories$.next(data);
      });
  }

  get slider$(): Observable<SliderApiData[]> {
    return this._slider$.asObservable();
  }

  get traks$(): Observable<TrackApiData[]> {
    return this._traks$.asObservable();
  }

  get categories$(): Observable<CategoriesApiData[]> {
    return this._categories$.asObservable();
  }
}
