import { Component, OnInit } from '@angular/core';
import { PhotoData } from '../../interfaces/PhotoData.interface';
import { Title, Meta } from '@angular/platform-browser';
import { PhotoStateService } from '../../services/photo-state.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  public photos: PhotoData;
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta,
    private photoStateSrv: PhotoStateService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXlight - Фотоальбом');
  }

  public setActivePage(page: number): void {

  }

}
