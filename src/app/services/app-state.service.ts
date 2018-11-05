import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SliderApiData } from '../interfaces/SliderApiData.interface';
import { TrackApiData } from '../interfaces/TrackApiData.interface';
import { MediaItem } from '../interfaces/MediaItem.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private slider: SliderApiData[] = [];
  private traks: MediaItem[] = [];
  private _slider$ = new BehaviorSubject(this.slider);
  private _traks$ = new BehaviorSubject(this.traks);
  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getSliderData()
      .then((data: SliderApiData[]) => {
        this.slider = data;
        this._slider$.next(this.slider);
      }).catch(err => console.log(err));
    this.apiService.getTracks()
      .then((data: MediaItem[]) => {
          this.traks = data;
          this._traks$.next(data);
      }).catch(err => console.log(err));
  }

  get slider$(): Observable<SliderApiData[]> {
    return this._slider$.asObservable();
  }

  get traks$(): Observable<MediaItem[]> {
    return this._traks$.asObservable();
  }
}
