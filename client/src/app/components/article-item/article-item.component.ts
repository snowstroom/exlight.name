import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ex-articles',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() public article: any;

  constructor() { }

  public ngOnInit(): void {
  }

}
