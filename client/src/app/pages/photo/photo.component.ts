import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PhotoStateService } from '../../services/photo-state.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  public photos: any [];
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta,
    private photoStateSrv: PhotoStateService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXlight - Фотоальбом');
    this.photoStateSrv.$photos.subscribe(photos => this.photos = photos);
  }

  public setActivePage(page: number): void {

  }

}
