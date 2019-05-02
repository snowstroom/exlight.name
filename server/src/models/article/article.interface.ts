import * as sequelize from 'sequelize';

export interface IArticleAtributes {
    id?: number;

    title: string;
    route: string;
    dateOfPublic: Date;
    description: string;
    content: string;
    categoryId: number;
    views: number;
    previewImgUrl:string;
    author: number;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface IArticleInstance extends sequelize.Instance<IArticleAtributes>, IArticleAtributes { }
export interface IArticleModel extends sequelize.Model<IArticleInstance, IArticleAtributes> { }
