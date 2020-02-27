import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PhotoStateService } from '../../services/photo-state.service';

@Component({
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  public photos: any[];
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta,
    private photoStateSrv: PhotoStateService,
  ) {}

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - Фотоальбом');
    this.photoStateSrv.$photos.subscribe(photos => (this.photos = photos));
  }

  public setActivePage(page: number): void {}
}
