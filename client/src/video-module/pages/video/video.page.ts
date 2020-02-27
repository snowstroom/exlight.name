import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {
  public currentpage: number;

  constructor(private titleSrv: Title, private metaSrv: Meta) {}

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - Видео');
  }

  public setActivePage(page: number): void {}
}
