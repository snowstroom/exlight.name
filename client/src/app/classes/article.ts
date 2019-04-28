export interface IArticle {
    id: number;
    title: string;
    publicationDate: string | Date;
    description: string;
    content: string;
    views: number;
    category: number;
    route: string;
    rating: number;
    isAppreciated: boolean;
}

export interface IArticleApiData {
    totalItems: number;
    articles: IArticle[];
    category?: number;
}

export class Article implements IArticle {
    public readonly id: number = this.__data.id;
    public title: string = this.__data.title;
    public publicationDate = new Date(<string>this.__data.publicationDate);
    public description: string = this.__data.description;
    public content: string = this.__data.content;
    public views: number = this.__data.views;
    public category: number  = this.__data.category;
    public route: string = this.__data.route;
    public rating: number = this.__data.rating;
    public isAppreciated: boolean = this.__data.isAppreciated;

    constructor(private __data: IArticle) {}
}
