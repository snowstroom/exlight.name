import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXlight - Видео');
  }

  public setActivePage(page: number): void {

  }

}