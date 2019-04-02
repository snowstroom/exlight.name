import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from '@app/services/article.service';
import { Article } from '@app/classes/article';
import { ApplicationService } from '@app/services/app.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnDestroy {
  public wait = true;
  public article: Article;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private appSrv: ApplicationService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => this.getArticleByRoute(params.article));
    this.appSrv.$scroll.subscribe(scroll => {
      this.toogleShare(scroll);
      this.toogleProgress(scroll);
    });
  }

  public ngOnDestroy(): void {
    this.appSrv.hideScrollProgress();
    this.appSrv.hideShareBlock();
  }

  private async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    this.wait = false;
    setTimeout(() => innerHeight === document.body.scrollHeight ?
        this.appSrv.showShareBlock() :
        this.appSrv.hideShareBlock(), 0);
    if (this.article) {
      this.appSrv.pageInfo = {
        title: this.article.title,
        description: this.article.description,
        keywords: [],
        url: this.router.url,
        img: ''
      };
    }
  }

  private toogleShare(scroll: number): void {
    const progress = ApplicationService.scrollPageToPrecent(scroll);
    if (progress <= 15) {
      this.appSrv.hideShareBlock();
    } else if (progress > 15 && progress < 90) {
      this.appSrv.showShareBlock();
    } else if (progress >= 90) {
      this.appSrv.hideShareBlock();
    }
  }

  private toogleProgress(scroll: number): void {
    if (scroll > 100) {
      this.appSrv.showScrollProgress();
    } else {
      this.appSrv.hideScrollProgress();
    }
  }
}
