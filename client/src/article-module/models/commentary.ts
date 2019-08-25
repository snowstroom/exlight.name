import { ArticleNamespace } from '@share/*';

export class Commentary implements ArticleNamespace.ICommentary {
    public id: number = this.__data.id;
    public articleId: number = this.__data.articleId;
    public commentId: number = this.__data.commentId;
    public comment: string = this.__data.comment;
    public createDate: Date | string = new Date(<string>this.__data.createDate);
    public updateDate: Date | string = new Date(<string>this.__data.updateDate);

    constructor(private __data: ArticleNamespace.ICommentary) {}
}
