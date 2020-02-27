import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMediaItem } from '@app/interfaces/MediaItem.interface';

@Injectable({
  providedIn: 'root',
})
export class MusicStateService {
  private musicItems: IMediaItem[] = [];
  private musicItems$ = new BehaviorSubject<IMediaItem[]>(this.musicItems);
  private playingTrack: IMediaItem;
  private playingTrack$ = new BehaviorSubject<IMediaItem>(this.playingTrack);
  private isPlay$ = new BehaviorSubject<boolean>(false);
  private volume = 1;
  private volume$ = new BehaviorSubject<number>(this.volume);
  private currentTime = 0;
  private currentTime$ = new BehaviorSubject(this.currentTime);
  private intTime$ = new BehaviorSubject(this.currentTime);
  private duration = null;
  private duration$ = new BehaviorSubject(this.duration);
  constructor() {
    /*
    this.apiSrv.getTracks()
      .then(musicList => {
        this.musicItems = musicList;
        this.musicItems$.next(this.musicItems);
        if (musicList.length) {
          this.playingTrack = musicList[0];
          this.playingTrack$.next(this.playingTrack);
        }
      });*/
  }

  get $musicItems(): Observable<IMediaItem[]> {
    return this.musicItems$.asObservable();
  }

  get $playingTrack(): Observable<IMediaItem> {
    return this.playingTrack$.asObservable();
  }

  get $isPlay(): Observable<boolean> {
    return this.isPlay$.asObservable();
  }

  get $volume(): Observable<number> {
    return this.volume$.asObservable();
  }

  get $currentTime(): Observable<number> {
    return this.currentTime$.asObservable();
  }

  get $intTime(): Observable<number> {
    return this.intTime$.asObservable();
  }

  get $duration(): Observable<number> {
    return this.duration$.asObservable();
  }

  public playTrack(track: IMediaItem) {
    this.playingTrack = track;
    this.currentTime = 0;
    this.currentTime$.next(this.currentTime);
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
      this.currentTime = 0;
      this.currentTime$.next(this.currentTime);
      this.playingTrack$.next(this.playingTrack);
      this.isPlay$.next(true);
    }
  }

  public prev() {
    const index = this.musicItems.indexOf(this.playingTrack);
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      this.playingTrack = this.musicItems[prevIndex];
      this.currentTime = 0;
      this.currentTime$.next(this.currentTime);
      this.playingTrack$.next(this.playingTrack);
      this.isPlay$.next(true);
    }
  }

  public navByTrack(time: number) {
    this.currentTime = time;
    this.intTime$.next(this.currentTime);
  }

  public showTime(time: number) {
    this.currentTime = time;
    this.currentTime$.next(this.currentTime);
  }

  public changeVolume(volume: number) {
    this.volume = volume;
    this.volume$.next(volume);
  }

  public setDuration(duration: number) {
    this.duration = duration;
    this.duration$.next(this.duration);
  }
}
