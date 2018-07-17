import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/ArticleApiData.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {
  @Input() articles: Article;

  constructor() { }

  ngOnInit() {
  }

}
