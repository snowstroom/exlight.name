import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXligth - Главная');
  }

}
