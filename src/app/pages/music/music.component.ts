import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  public currentpage: number;

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXligth - Музыка');
  }

  public setActivePage(page: number): void {

  }

}
