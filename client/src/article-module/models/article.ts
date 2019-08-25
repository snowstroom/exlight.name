import { Article as SchemaOrgArticle } from 'schema-dts';
import { ArticleNamespace } from '@share/';

export interface IArticleApiData {
    totalItems: number;
    articles: ArticleNamespace.IArticle[];
    category?: number;
}

export class Article implements ArticleNamespace.IArticle {
    public readonly id: number = this.__data.id;
    public readonly structData: SchemaOrgArticle;
    public title: string = this.__data.title;
    public publicationDate = new Date(<string>this.__data.publicationDate);
    public description: string = this.__data.description;
    public content: string = this.__data.content;
    public views: number = this.__data.views;
    // public category: number  = this.__data.category;
    public route: string = this.__data.route;
    // public rating: number = this.__data.rating;
    // public isAppreciated: boolean = this.__data.isAppreciated;
    public author: number = this.__data.author;
    public categoryId: number = this.__data.categoryId;

    constructor(private __data: Partial<ArticleNamespace.IArticle> = {}) {}
}
