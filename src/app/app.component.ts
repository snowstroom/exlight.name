import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MusicStateService } from './services/music-state.service';
import { MediaItem } from './interfaces/MediaItem.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('htmlPlayer') htmlPlayer: ElementRef<HTMLAudioElement>;
  public track: MediaItem;
  public isPlay: boolean;
  public canPlay: boolean;
  public loop = false;
  constructor(
    private musicStateSrv: MusicStateService
  ) { }

  ngOnInit() {
    this.musicStateSrv.$playingTrack.subscribe(track => this.track = track);
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

  public trackEnd() {
    console.log('track end');
  }

  public trackPlay() {
    // this.musicStateSrv.isPlaying = true;
  }

  public play() {
    this.canPlay = true;
    if (this.isPlay) {
      this.htmlPlayer.nativeElement.play();
    }
  }

  public loadstart() {
    this.canPlay = false;
  }
}
