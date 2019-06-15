import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MusicStateService } from '../music-module/services/music-state.service';
import { IMediaItem } from './interfaces/MediaItem.interface';
import { EnviromentService } from './services/envirement.service';
import { E_SCREEN_TYPE } from './enums/screen-type';
import { ApplicationService } from './services/app.service';

@Component({
  selector: 'ex-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('htmlPlayer') public  htmlPlayer: ElementRef<HTMLAudioElement>;
  public track: IMediaItem;
  public isPlay: boolean;
  public canPlay: boolean;
  public loop = false;
  public currentTime = 0;
  public timer: any;
  public ldJsonSchema: any;
  constructor(
    private musicStateSrv: MusicStateService,
    private envSrv: EnviromentService,
    private appSrv: ApplicationService
  ) {
    this.envSrv.$screenType.subscribe(type => console.warn(E_SCREEN_TYPE[type]));
    this.appSrv.$ldJsonSchema.subscribe(schema => {
      this.ldJsonSchema = schema;
    });
  }

  public ngOnInit(): void {
    this.musicStateSrv.$playingTrack.subscribe(track => this.track = track);
    this.musicStateSrv.$volume.subscribe(volume => this.htmlPlayer.nativeElement.volume = volume);
    this.musicStateSrv.$intTime.subscribe(currentTime => this.htmlPlayer.nativeElement.currentTime = currentTime);
    this.musicStateSrv.$isPlay.subscribe(play => {
      this.isPlay = play;
      if (this.canPlay && play) {
        this.htmlPlayer.nativeElement.play();
      }
      if (!play) {
        this.htmlPlayer.nativeElement.pause();
      }
    });
  }

  public hideSideNav(): void {
    this.appSrv.hideSideNav();
  }

  public trackEnd(): void {
    this.musicStateSrv.next();
  }

  public trackPlay(): void {
    // this.musicStateSrv.isPlaying = true;
  }

  public play(): void {
    this.canPlay = true;
    this.musicStateSrv.setDuration(this.htmlPlayer.nativeElement.duration);
    if (this.isPlay) {
      this.htmlPlayer.nativeElement.play();
    }
  }

  public loadstart(): void {
    this.canPlay = false;
  }

  public timeupdate(e): void {
    if (e.target.currentTime - this.currentTime > 1) {
      this.musicStateSrv.showTime(e.target.currentTime);
      this.currentTime = e.target.currentTime;
    }
  }

  public showSideNav(e: any): void {
    console.warn(e);
    this.appSrv.showSideNav();
  }
}
