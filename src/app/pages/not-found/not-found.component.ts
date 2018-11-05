import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private titleSrv: Title,
    private metaSrv: Meta
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('eXligth - Страница не найдена');
  }

}
