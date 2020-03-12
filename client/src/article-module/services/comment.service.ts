import { Injectable, Injector } from '@angular/core';
import { Api, PaginationParams } from '@core/classes';
import { EnviromentService } from '@app/services/envirement.service';
import { ArticleNamespace, ApiNamespace } from '@share/*';
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
  ): Promise<ApiNamespace.IPaginationContent<Commentary>> {
    try {
      const params = pagParams.getUrlString();
      const { content, count } = await this.get<
        ApiNamespace.IPaginationContent<ArticleNamespace.IArticleCommentary>
      >(`commentary/list/article/${articleId}${params}`);
      return {
        content: content.map(c => new Commentary(c)),
        count,
      };
    } catch (error) {
      return {
        content: [],
        count: 0,
      };
    }
  }
}
