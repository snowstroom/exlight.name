import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { IMediaItem } from '../../../app/interfaces/MediaItem.interface';
import { MusicStateService } from '../../services/music-state.service';

@Component({
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  public currentpage: number;
  public mediaItems: IMediaItem[];

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta,
    private musicStateSrv: MusicStateService,
  ) {}

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXligth - Музыка');
    this.musicStateSrv.$musicItems.subscribe(
      musicList => (this.mediaItems = musicList),
    );
  }

  public setActivePage(page: number): void {}
}
