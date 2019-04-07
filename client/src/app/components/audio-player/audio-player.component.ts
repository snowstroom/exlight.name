import { Component, OnInit } from '@angular/core';
import { MusicStateService } from '../../services/music-state.service';
import { IMediaItem } from '../../interfaces/MediaItem.interface';

@Component({
  selector: 'ex-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {
  public isPlay: boolean;
  public tracks: IMediaItem[];
  public playingTrack: IMediaItem;
  public volume = 1;
  public currentTime = 0;
  public duration: number;

  constructor(
    private musicStateSrv: MusicStateService
  ) { }

  public ngOnInit(): void {
    this.musicStateSrv.$musicItems.subscribe(tracks => this.tracks = tracks);
    this.musicStateSrv.$playingTrack.subscribe(playingTrack => this.playingTrack = playingTrack);
    this.musicStateSrv.$isPlay.subscribe(play => this.isPlay = play);
    this.musicStateSrv.$volume.subscribe(volume => this.volume = volume);
    this.musicStateSrv.$currentTime.subscribe(currentTime => this.currentTime = currentTime);
    this.musicStateSrv.$duration.subscribe(duration => this.duration = duration);
  }

  public play(): void {
    this.musicStateSrv.play();
  }

  public pause(): void {
    this.musicStateSrv.pause();
  }

  public prevTrack(): void {
    this.musicStateSrv.prev();
  }

  public nextTrack(): void {
    this.musicStateSrv.next();
  }

  public playTrack(track: IMediaItem): void {
      this.musicStateSrv.playTrack(track);
  }

  public changeVolume(e: any): void {
    this.musicStateSrv.changeVolume(e.target.value);
  }

  public changePosition(e: any): void {
    this.musicStateSrv.navByTrack(e.target.value);
  }

}
