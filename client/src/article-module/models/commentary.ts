import { ArticleNamespace } from '@share/*';
import { CoreNamespace } from '@share/core.namespace';
import { UserApi } from '@account-module/models/api/user';

export class Commentary extends CoreNamespace.AbstractCommentary {
  public articleId = 0;
  public comments: Commentary[] = [];
  public user: UserApi;
  public parentComment: Commentary | null;

  public updating = false;
  public editable = false;

  constructor(__data?: Partial<ArticleNamespace.IArticleCommentary>) {
    super(__data);
    if (__data) {
      this.__data = __data;
      this.articleId = __data.articleId;
      this.user = new UserApi(__data.user);
      this.parentComment = __data.parentComment
        ? new Commentary(__data.parentComment)
        : null;
      this.comments = __data.comments
        ? __data.comments.map(c => new Commentary(c))
        : [];
    }
  }

  public toJSON(): Partial<ArticleNamespace.IArticleCommentary> {
    return {
      id: this.id ? this.id : undefined,
      comment: this.comment,
      parentComment: this.parentComment,
    };
  }
}
