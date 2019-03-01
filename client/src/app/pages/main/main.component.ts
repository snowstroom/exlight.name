import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '@app/services/article.service';
import { CarouselItem } from '@app/classes/carousel-item';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public carouselItem: CarouselItem[];

  constructor(
    private articleSrv: ArticleService,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.articleSrv.$carouselItems.subscribe(items => this.carouselItem = items);
  }

  public ngOnInit(): void {
    this.titleSrv.setTitle('eXligth - Главная');
  }

}
