import { Component, OnInit, Input } from '@angular/core';
import { ArticleApiData } from '../../interfaces/ArticleApiData.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  @Input() articles: ArticleApiData;

  constructor() { }

  ngOnInit() {
  }

}
