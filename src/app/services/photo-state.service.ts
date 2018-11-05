import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PhotoData } from '../interfaces/PhotoData.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoStateService {
  private photos: PhotoData[] = [];
  private photos$ = new BehaviorSubject<PhotoData[]>(this.photos);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getPhotos()
      .then(photos => {
        this.photos = photos;
        this.photos$.next(this.photos);
      }).catch(err => console.log(err));
   }

  get $photos(): Observable<PhotoData[]> {
    return this.photos$.asObservable();
  }
}
