import * as sequelize from 'sequelize';

export interface ICommentaryAtributes {
    id?: number;
    
    user: number;
    body: string;
    commentary: number;
    article: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICommentaryInstance extends sequelize.Instance<ICommentaryAtributes>, ICommentaryAtributes { }

export interface ICommentaryModel extends sequelize.Model<ICommentaryInstance, ICommentaryAtributes> { }
