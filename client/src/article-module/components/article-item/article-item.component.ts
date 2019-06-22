import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '@article-module/models/article';

@Component({
  selector: 'ex-articles',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent {
  @Input() public article: Article;

  public setRating(rating: number): void {
    console.warn(rating);
  }
}
