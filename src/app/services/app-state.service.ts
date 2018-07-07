import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SliderApiData } from '../interfaces/SliderApiData.interface';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private slider: SliderApiData[] = [];
  constructor(
    private apiService: ApiService
  ) {
    this.apiService.getSliderData()
      .then((data: SliderApiData[]) => this.slider = data);
  }
}
