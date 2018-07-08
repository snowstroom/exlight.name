import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private slider: SliderApiData[] = [];
  private _slider$ = new BehaviorSubject(this.slider);
  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getSliderData()
      .then((data: SliderApiData[]) => {
        this.slider = data;
        this._slider$.next(this.slider);
      });
  }

  get slider$(): Observable<SliderApiData[]> {
    return this._slider$.asObservable();
  }
}
