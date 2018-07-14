import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXlight - Фотоальбом');
  }

}
