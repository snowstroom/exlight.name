import { ArticleNamespace } from '@share/*';
import { CoreNamespace } from '@share/core.namespace';
import { UserApi } from '@account-module/models/api/user';

export class Commentary extends CoreNamespace.AbstractCommentary
  implements ArticleNamespace.IArticleCommentary {
  public articleId = 0;
  public comments: Commentary[] = [];
  public user: UserApi;
  public parentComment: Commentary | null;

  public likeCount: number;

  public updating = false;
  public editable = false;

  get haveEditAnswer(): boolean {
    return this.comments.findIndex((c) => !c.id) > -1;
  }

  constructor(__data?: Partial<ArticleNamespace.IArticleCommentary>) {
    super(__data);
    if (__data) {
      this.__data = __data;
      this.articleId = __data.articleId;
      this.user = new UserApi(__data.user);
      this.likeCount = __data.likeCount;
      if (__data.parentComment && __data.parentComment instanceof Commentary) {
        this.parentComment = __data.parentComment;
      } else if (__data.parentComment) {
        this.parentComment = new Commentary(__data.parentComment);
      } else {
        this.parentComment = null;
      }
      this.comments = __data.comments
        ? __data.comments.map(
            (c) => new Commentary({ ...c, parentComment: this }),
          )
        : [];
    }
  }

  public toJSON(): Partial<ArticleNamespace.IArticleCommentary> {
    return {
      id: this.id ? this.id : undefined,
      comment: this.comment,
      parentComment: this.parentComment,
      edited: !!this.edited,
    };
  }
}
