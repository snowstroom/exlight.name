export namespace CoreNamespace {
    export interface ICommentary {
        id?: number;
        comment: string;
        authorId?: number;
        commentId?: number;
        createDate: string | Date;
        updateDate: string | Date;
    }

    export abstract class AbstractCommentary implements ICommentary {
        public id: number = this.__data.id;
        public comment: string = this.__data.comment;
        public commentId: number = this.__data.commentId;
        public authorId: number = this.__data.authorId;
        public createDate: Date = new Date(<string>this.__data.createDate);
        public updateDate: Date = new Date(<string>this.__data.updateDate);

        constructor(protected __data: Partial<ICommentary> = {}) {}
    }
}
