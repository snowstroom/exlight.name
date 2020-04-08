import { UserApi } from '@account-module/models/api/user';
import { ProfileService } from '@account-module/services/profile.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '@app/services/app.service';
import { Article } from '@article-module/models/article';
import { Commentary } from '@article-module/models/commentary';
import { ArticleService } from '@article-module/services/article.service';
import { CommentService } from '@article-module/services/comment.service';
import { RatingService } from '@article-module/services/rating.service';
import { PaginationParams } from '@core/classes';
import { ArticleNamespace } from '@share/*';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnDestroy {
  public wait = true;
  public article: Article;
  public commentsWait = true;
  public comments: Commentary[] = [];
  public commentsTotalCount = 0;
  public commentsPagParams = new PaginationParams({ limit: 15 });
  public rating: ArticleNamespace.IRatingInfo;
  public userProfile: UserApi;
  private unsubscribe = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleSrv: ArticleService,
    private appSrv: ApplicationService,
    private artCommentSrv: CommentService,
    private router: Router,
    private ratingSrv: RatingService,
    private profileSrv: ProfileService,
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (params: { article: string }) =>
        this.getArticleByRoute(params.article),
      );
    this.appSrv.$scroll
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((scroll) => {
        this.toggleShare(scroll);
        this.toggleProgress(scroll);
      });
    this.profileSrv.$user
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((user) => (this.userProfile = user));
  }

  public ngOnDestroy(): void {
    this.appSrv.hideScrollProgress();
    this.appSrv.hideShareBlock();
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
    this.appSrv.setLdJsonSchema(null);
  }

  public async setRating(rate: ArticleNamespace.RatingNumber): Promise<void> {
    await this.ratingSrv.setArticleRating(this.article.id, rate);
    // setAlert() // TODO: set alert 'Thanks for estimate'
    this.rating = await this.ratingSrv.getArticleRating(this.article.id);
  }

  public async saveNewComment(comment: Commentary): Promise<void> {
    await this.artCommentSrv.addComment(this.article.id, comment);
    comment.updating = false;
    // TODO: don't reload tree
    const { content, count } = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
    this.comments = content;
    this.commentsTotalCount = count;
  }

  public async updateComment(comment: Commentary): Promise<void> {
    await this.artCommentSrv.updateComment(this.article.id, comment);
    comment.editable = false;
    comment.updating = false;
  }

  public async deleteComment(comment: Commentary): Promise<void> {
    await this.artCommentSrv.deleteComment(comment.id);
    // TODO: don't reload tree
    const { content, count } = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
    this.comments = content;
    this.commentsTotalCount = count;
  }

  public async getMoreComments(): Promise<void> {
    this.commentsPagParams.page++;
    const { content, count } = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
    this.comments.concat(content);
    this.commentsTotalCount = count;
  }

  public async likeCommentary(commentary: Commentary): Promise<void> {
    try {
      const answer = await this.artCommentSrv.likeCommentary(commentary.id);
      if (answer.msg === 'liked') {
        commentary.likeCount++;
      } else {
        commentary.likeCount--;
      }
    } catch (error) {
      console.warn(error);
    }
  }

  private async getArticleByRoute(route: string): Promise<void> {
    this.article = await this.articleSrv.getArticleByRoute(route);
    const { content, count } = await this.artCommentSrv.getCommentList(
      this.article.id,
      this.commentsPagParams,
    );
    this.comments = content;
    this.commentsTotalCount = count;
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
      this.appSrv.setLdJsonSchema(this.article.structData);
    }
  }

  private toggleShare(scroll: number): void {
    const progress = ApplicationService.scrollPageToPercent(scroll);
    if (progress <= 15) {
      this.appSrv.hideShareBlock();
    } else if (progress > 15 && progress < 90) {
      this.appSrv.showShareBlock();
    } else if (progress >= 90) {
      this.appSrv.hideShareBlock();
    }
  }

  private toggleProgress(scroll: number): void {
    if (scroll > 100) {
      this.appSrv.showScrollProgress();
    } else {
      this.appSrv.hideScrollProgress();
    }
  }
}
