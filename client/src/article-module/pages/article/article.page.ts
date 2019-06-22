import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@article-module/services/article.service';
import { Article } from '@article-module/models/article';
import { ApplicationService } from '@app/services/app.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss']
})
export class ArticlePage implements OnDestroy {
  public wait = true;
  public article: Article;
  private unsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private appSrv: ApplicationService,
    private router: Router
  ) {
    this.activatedRoute.params.pipe(takeUntil(this.unsubscribe))
      .subscribe(params => this.getArticleByRoute(params.article));
    this.appSrv.$scroll.pipe(takeUntil(this.unsubscribe))
      .subscribe(scroll => {
        this.toogleShare(scroll);
        this.toogleProgress(scroll);
      });
  }

  public ngOnDestroy(): void {
    this.appSrv.hideScrollProgress();
    this.appSrv.hideShareBlock();
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
    this.appSrv.setLdJsonShema(null);
  }

  public setRating(r: number): void {
    console.warn(r);
  }

  private async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    this.wait = false;
    setTimeout(() => innerHeight === document.body.scrollHeight ?
      this.appSrv.showShareBlock() :
      this.appSrv.hideShareBlock(), 0);
    if (this.article) {
      this.appSrv.setPageInfo({
        title: this.article.title,
        description: this.article.description,
        keywords: [],
        url: this.router.url,
        img: ''
      });
      this.appSrv.setLdJsonShema(this.article.structData);
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
