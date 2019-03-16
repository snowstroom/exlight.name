import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/classes/article';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private titleSrv: Title,
    private metaSrv: Meta
  ) {
    this.titleSrv.setTitle('Статья');
    this.activatedRoute.params.subscribe(params => this.getArticleByRoute(params.article));
  }

  public ngOnInit(): void { }

  public async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    console.warn(this.article);
  }

}
