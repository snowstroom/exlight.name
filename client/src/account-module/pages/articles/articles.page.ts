import { Component, OnDestroy } from '@angular/core';
import { ARTICLES_SECTIONS } from '@account-module/consts/account-sections';
import { ArticleService } from '@article-module/services/article.service';
import { ProfileService } from '@account-module/services/profile.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserApi } from '@account-module/models/api/user';
import { PaginationParams } from '@core/classes';
import { Article } from '@article-module/models/article';
import { ITEMS_ON_PAGE_ART } from '@app/consts/ItemsOnPage.const';
import { ActivatedRoute } from '@angular/router';
import { numberParam } from '@core/functions/number-param';

@Component({
  templateUrl: 'articles.page.html',
})
export class ArticlesPage implements OnDestroy {
  public readonly MENU_ITEMS = ARTICLES_SECTIONS;
  public articles: Article[] = [
    new Article({
      title: 'Test',
      publicationDate: new Date(),
      route: 'test',
    }),
  ];
  public page = 1;
  public readonly PAGE_LENGTH = ITEMS_ON_PAGE_ART;
  public pagParams = new PaginationParams({
    limit: 5,
    total: 30,
  });
  private readonly subscriber = new Subject();

  constructor(
    private articleSrv: ArticleService,
    private profileSrv: ProfileService,
    private activatedRoute: ActivatedRoute,
  ) {
    combineLatest(this.activatedRoute.params, this.profileSrv.$user)
      .pipe(takeUntil(this.subscriber))
      .subscribe(([params, user]) => {
        this.pagParams.page = numberParam(params.page);
        this.page = numberParam(params.page);
        this.init(user);
      });
  }

  public ngOnDestroy(): void {
    this.subscriber.next(null);
    this.subscriber.complete();
  }

  private async init(user: UserApi): Promise<void> {
    if (user) {
      this.articles = await this.articleSrv.getArticles(
        this.pagParams,
        null,
        user.id,
      );
    }
  }
}
