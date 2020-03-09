import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '@article-module/services/article.service';
import { Article } from '@article-module/models/article';
import { ApplicationService } from '@app/services/app.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Commentary } from '@article-module/models/commentary';
import { CommentService } from '@article-module/services/comment.service';
import { PaginationParams } from '@core/classes';
import { RatingService } from '@article-module/services/rating.service';
import { ArticleNamespace } from '@share/*';

@Component({
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnDestroy {
  public wait = true;
  public article: Article;
  public commentsWait = true;
  public comments: Commentary[] = [];
  public commentsPagParams = new PaginationParams({ limit: 15 });
  public rating: ArticleNamespace.IRatingInfo;
  private unsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private appSrv: ApplicationService,
    private artCommentSrv: CommentService,
    private router: Router,
    private ratingSrv: RatingService,
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (params: { article: string }) =>
        this.getArticleByRoute(params.article),
      );
    this.appSrv.$scroll.pipe(takeUntil(this.unsubscribe)).subscribe(scroll => {
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

  public async setRating(rate: ArticleNamespace.RatingNumber): Promise<void> {
    await this.ratingSrv.setArticleRating(this.article.id, rate);
  }

  public async saveNewComment(comment: Commentary): Promise<void> {
    await this.artCommentSrv.addComment(this.article.id, comment);
    comment.updating = false;
    // TODO: don't reload tree
    this.comments = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
  }

  public async updateComment(comment: Commentary): Promise<void> {
    console.warn(comment);
    comment.editable = false;
  }

  public async deleteComment(comment: Commentary): Promise<void> {
    await this.artCommentSrv.deleteComment(comment.id);
    // TODO: don't reload tree
    this.comments = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
  }

  private async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    this.comments = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
    this.commentsWait = false;
    this.rating = await this.ratingSrv.getArticleRating(this.article.id);
    this.wait = false;
    setTimeout(
      () =>
        innerHeight === document.body.scrollHeight
          ? this.appSrv.showShareBlock()
          : this.appSrv.hideShareBlock(),
      0,
    );
    if (this.article) {
      this.appSrv.setPageInfo({
        title: this.article.title,
        description: this.article.description,
        keywords: [],
        url: this.router.url,
        img: '',
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
