import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '@app/classes/article';

@Component({
  selector: 'ex-articles',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent {
  @Input() public article: Article;
  @Input() public route: (a: Article) => string[];
}
