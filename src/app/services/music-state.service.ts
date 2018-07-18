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
  private playingTrack: MediaItem;
  private playingTrack$ = new BehaviorSubject<MediaItem>(this.playingTrack);
  private isPlay$ = new BehaviorSubject<boolean>(false);
  private currentTime = new BehaviorSubject(0);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getTracks()
      .then(musicList => {
        this.musicItems = musicList;
        this.musicItems$.next(this.musicItems);
        if (musicList.length) {
          this.playingTrack = musicList[0];
          this.playingTrack$.next(this.playingTrack);
        }
      });
  }

  get $musicItems(): Observable<MediaItem[]> {
    return this.musicItems$.asObservable();
  }

  get $playingTrack(): Observable<MediaItem> {
    return this.playingTrack$.asObservable();
  }

  get $isPlay(): Observable<boolean> {
    return this.isPlay$.asObservable();
  }

  public playTrack(track: MediaItem) {
    this.playingTrack = track;
    this.playingTrack$.next(track);
    this.isPlay$.next(true);
  }

  public play() {
    this.isPlay$.next(true);
  }

  public pause() {
    this.isPlay$.next(false);
  }

  public next() {
    const index = this.musicItems.indexOf(this.playingTrack);
    const nextIndex = index + 1;
    if (nextIndex < this.musicItems.length) {
      this.playingTrack = this.musicItems[nextIndex];
      this.playingTrack$.next(this.playingTrack);
      this.isPlay$.next(true);
    }
  }

  public prev() {
    const index = this.musicItems.indexOf(this.playingTrack);
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      this.playingTrack = this.musicItems[prevIndex];
      this.playingTrack$.next(this.playingTrack);
      this.isPlay$.next(true);
    }
  }

  public navByTrack() {

  }

  public changeVolume() {

  }

}
