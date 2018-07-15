import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MediaItem } from '../interfaces/MediaItem.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicStateService {
  private musicItems: MediaItem[] = [];
  private musicItems$ = new BehaviorSubject<MediaItem[]>(this.musicItems);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getTracks()
      .then(musicList => {
        this.musicItems = musicList;
        this.musicItems$.next(this.musicItems);
      });
  }

  get $musicItems(): Observable<MediaItem[]> {
    return this.musicItems$.asObservable();
  }


}
