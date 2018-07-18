import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { MediaItem } from '../interfaces/MediaItem.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicStateService {
  private musicItems: MediaItem[] = [];
  private musicItems$ = new BehaviorSubject<MediaItem[]>(this.musicItems);
  private play$ = new Subject<MediaItem>();
  private pause$ = new Subject<MediaItem>();
  private currentTime = new Subject();
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

  get $play(): Observable<MediaItem> {
    return this.play$.asObservable();
  }

  public playTrack(track: MediaItem) {
    this.play$.next(track);
  }


}
