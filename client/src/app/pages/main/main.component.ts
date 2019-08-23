import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '@article-module/services/article.service';
import { CarouselItem } from '@app/models/carousel-item';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public carouselItems: CarouselItem[] = [];

  constructor(
    private articleSrv: ArticleService,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.articleSrv.$carouselItems.subscribe(items => this.carouselItems = items);
  }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXligth - Главная');
  }

}
