import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMediaItem } from '../../../app/interfaces/MediaItem.interface';

@Component({
  selector: 'ex-media-catalog',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {
  @Input() public mediaItem: IMediaItem;
  @Output() public play = new EventEmitter();
  @Output() public download = new EventEmitter();
  constructor() { }

  public ngOnInit(): void { }

  public onPlay(): void {
    this.play.emit(this.mediaItem);
  }

  public onDownload(): void {
    this.download.emit();
  }

}
