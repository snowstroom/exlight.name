import { ArticleNamespace } from '@share/*';
import { CoreNamespace } from '../../../../share/core.namespace';

export class Commentary extends CoreNamespace.AbstractCommentary implements ArticleNamespace.IArticleCommentary {
    public articleId: number = this.__data.articleId;

    constructor(protected __data: Partial<ArticleNamespace.IArticleCommentary> = {}) {
        super(__data);
    }

    public toJSON(): Partial<ArticleNamespace.IArticleCommentary> {
        return {
            comment: this.comment
        };
    }
}
