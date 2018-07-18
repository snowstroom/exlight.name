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
  public tracks: MediaItem[];
  public track: MediaItem;
  public loop = false;
  constructor(
    private musicStateSrv: MusicStateService
  ) { }

  ngOnInit() {
    this.musicStateSrv.$musicItems.subscribe(tracks => this.track = tracks[0]);
    this.musicStateSrv.$play.subscribe(track => {
      this.track = track;
      this.htmlPlayer.nativeElement.play();
    });
  }

  public trackEnd() {
    console.log('track end');
  }

  public trackPlay() {
    this.musicStateSrv.isPlaying = true;
  }
}
