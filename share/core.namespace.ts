import { UserNamespace } from './user.namespace';
export namespace CoreNamespace {
  export interface ICommentary {
    id?: number;
    comment: string;
    edited: boolean;
    createDate: string | Date;
    updateDate: string | Date;
    comments: ICommentary[];
    user?: UserNamespace.IUser;
    parentComment?: Partial<ICommentary>;
  }

  export abstract class AbstractCommentary implements ICommentary {
    public id = 0;
    public comment = '';
    public edited = false;
    public createDate = new Date();
    public updateDate = new Date();
    public abstract user: UserNamespace.IUser;
    public abstract comments: ICommentary[];
    public abstract parentComment: ICommentary;

    public __data: Partial<ICommentary> = {};

    constructor(__data?: Partial<ICommentary>) {
      if (__data) {
        this.id = __data.id;
        this.comment = __data.comment;
        this.createDate = new Date(<string>__data.createDate);
        this.updateDate = new Date(<string>__data.updateDate);
        this.edited = __data.edited;
        this.__data = __data;
      }
    }
  }
}
