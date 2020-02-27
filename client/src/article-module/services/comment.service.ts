import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { ArticleNamespace } from '@share/*';
import { Commentary } from '@article-module/models/commentary';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends Api {
  constructor(injector: Injector, envSrv: EnviromentService) {
    super(injector, envSrv.API_DOMAIN);
  }

  public async addComment(
    articleId: number,
    comment: ArticleNamespace.IArticleCommentary,
  ): Promise<any> {
    try {
      await this.post(`commentary/item/article/${articleId}`, comment);
    } catch (error) {
      console.warn(error);
    }
  }

  public async updateComment(
    articleId: number,
    comment: ArticleNamespace.IArticleCommentary,
  ): Promise<any> {
    try {
      await this.put(`commentary/${comment.id}/article/${articleId}`, comment);
    } catch (error) {
      console.warn(error);
    }
  }

  public async deleteComment(commentId: number): Promise<boolean> {
    try {
      await this.delete(`commentary/${commentId}/article`);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async getCommentList(
    articleId: number,
    pagParams: PaginationParams,
  ): Promise<Commentary[]> {
    try {
      const params = pagParams.getUrlString();
      const comments = await this.get<ArticleNamespace.IArticleCommentary[]>(
        `commentary/list/article/${articleId}${params}`,
      );
      return comments.map(c => new Commentary(c));
    } catch (error) {
      return [];
    }
  }
}
