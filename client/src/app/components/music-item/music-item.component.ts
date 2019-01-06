import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MediaItem } from '../../interfaces/MediaItem.interface';

@Component({
  selector: 'app-media-catalog',
  templateUrl: './music-item.component.html',
  styleUrls: ['./music-item.component.scss']
})
export class MusicItemComponent implements OnInit {
  @Input() mediaItem: MediaItem;
  @Output() play = new EventEmitter();
  @Output() download = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  public onPlay(): void {
    this.play.emit(this.mediaItem);
  }

  public onDownload(): void {
    this.download.emit();
  }

}
