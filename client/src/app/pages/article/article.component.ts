import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/classes/article';
import { ApplicationService } from '@app/services/app.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  public wait = true;
  public article: Article;
  public visibleShare = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private titleSrv: Title,
    private appSrv: ApplicationService,
    private metaSrv: Meta
  ) {
    this.titleSrv.setTitle('Статья');
    this.activatedRoute.params.subscribe(params => this.getArticleByRoute(params.article));
    this.appSrv.$scroll.subscribe(scroll => this.toogleShare(scroll));
  }

  public async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    this.wait = false;
    setTimeout(() => {
      this.visibleShare = innerHeight === document.body.scrollHeight ? true : false;
    }, 0);
  }

  public toogleShare(scroll: number): void {
    const progress = scroll * 100 / (document.body.scrollHeight - innerHeight);
    if (progress <= 15) {
      this.visibleShare = false;
    } else if (progress > 15 && progress < 90) {
      this.visibleShare = true;
    } else if (progress >= 90) {
      this.visibleShare = false;
    }
  }

}
