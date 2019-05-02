import * as sequelize from 'sequelize';

export interface ITagAtributes {
    id?: number;
    name: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITagInstance extends sequelize.Instance<ITagAtributes> { }

export interface ITagModel extends sequelize.Model<ITagInstance, ITagAtributes> { }

export interface ITagOfArticleAtributes {
    article: number;
    tag: number;

    createdAt?: Date;
}

export interface ITagOfArticleInstance extends sequelize.Instance<ITagOfArticleAtributes> { }

export interface ITagOfArticleModel extends sequelize.Model<ITagOfArticleInstance, ITagOfArticleAtributes> { }