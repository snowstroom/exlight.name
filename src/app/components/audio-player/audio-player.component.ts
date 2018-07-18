import { Component, OnInit } from '@angular/core';
import { MusicStateService } from '../../services/music-state.service';
import { MediaItem } from '../../interfaces/MediaItem.interface';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  public isPlay: boolean;
  public tracks: MediaItem[];
  public playingTrack: MediaItem;

  constructor(
    private musicStateSrv: MusicStateService
  ) { }

  ngOnInit() {
    this.musicStateSrv.$musicItems.subscribe(tracks => this.tracks = tracks);
    this.musicStateSrv.$playingTrack.subscribe(playingTrack => this.playingTrack = playingTrack);
    this.musicStateSrv.$isPlay.subscribe(play => this.isPlay = play);
  }

  public play() {
    this.musicStateSrv.play();
  }

  public pause() {
    this.musicStateSrv.pause();
  }

  public prevTrack() {
    this.musicStateSrv.prev();
  }

  public nextTrack() {
    this.musicStateSrv.next();
  }

  public playTrack(track: MediaItem) {
      this.musicStateSrv.playTrack(track);
  }

}
