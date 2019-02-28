import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXlight - О себе');
  }

}
