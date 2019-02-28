export interface IArticle {
    id: number;
    title: string;
    date: string;
    discription: string;
    article: string;
    views: number;
    category: number;
    route: string;
}

export interface IArticleApiData {
    totalItems: number;
    articles: IArticle[];
    category?: number;
}

export class Article implements IArticle {
    public readonly id: number;
    public title: string;
    public date: string;
    public discription: string;
    public article: string;
    public views: number;
    public category: number;
    public route: string;

    constructor(private itemData: IArticle) {
        this.id = itemData.id;
        this.title = itemData.title;
        this.date = itemData.date;
        this.discription = itemData.discription;
        this.article = itemData.article;
        this.views = itemData.views;
        this.category = itemData.category;
        this.route = itemData.route;
    }
}
