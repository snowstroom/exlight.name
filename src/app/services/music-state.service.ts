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
  private currentPlayTrack: MediaItem = null;
  private play$ = new BehaviorSubject<MediaItem>(this.currentPlayTrack);
  private isPlay = false;
  private isPlay$ = new BehaviorSubject<boolean>(this.isPlay);
  private pause$ = new BehaviorSubject<MediaItem>(null);
  private currentTime = new BehaviorSubject(0);
  constructor(
    private apiSrv: ApiService
  ) {
    this.apiSrv.getTracks()
      .then(musicList => {
        this.musicItems = musicList;
        this.musicItems$.next(this.musicItems);
      });
  }

  set isPlaying(value) {
    this.isPlay = value;
    this.isPlay$.next(this.isPlay);
  }

  get $musicItems(): Observable<MediaItem[]> {
    return this.musicItems$.asObservable();
  }

  get $play(): Observable<MediaItem> {
    return this.play$.asObservable();
  }

  get $isPlay(): Observable<boolean> {
    return this.isPlay$.asObservable();
  }

  public playTrack(track: MediaItem) {
    this.play$.next(track);
  }

  public play() {
    this.isPlay = true;
    this.isPlay$.next(this.isPlay);
  }

  public pause() {
    this.isPlay = false;
    this.isPlay$.next(this.isPlay);
  }

  public next() {
    this.isPlay = true;
    this.isPlay$.next(this.isPlay);
  }

  public prev() {
    this.isPlay = true;
    this.isPlay$.next(this.isPlay);
  }

  public navByTrack() {

  }

  public changeVolume() {

  }

}
