import { IModel } from '../interfaces/model.inteface';
import { ARTICLES } from '../consts/tables.const';

export interface IArticleModel {
    id?: number;
    article_title: string;
    article_route: string;
    publication_date: string;
    article_description: string;
    category_id: number;
    content: number;
    views: number;
}

export class ArticleModel implements IArticleModel, IModel {
    public id: number = null;
    public article_title: string = null;
    public article_route: string = null;
    public publication_date: string = null;
    public article_description: string = null;
    public category_id: number = null;
    public content: number = null;
    public views: number = null;

    constructor(data?: Partial<IArticleModel>) {
        this.init(data);
    }

    public init(data?: Partial<IArticleModel>) {
        if (data) {
            this.id = data.id;
            this.article_title = data.article_title || null;
            this.article_route = data.article_route || null;
            this.publication_date = data.publication_date || null;
            this.article_description = data.article_description || null;
            this.category_id = data.category_id || null;
            this.content = data.content || null;
            this.views = data.views || null;
        }
    }

    public getInsertQuery(): string {
        const fields = Object.keys(this);
        let filedStr = [];
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            filedStr.push(`${field || "NULL"}`);
        }
        return `INSERT INTO ${ARTICLES} (${filedStr.concat(',')})`;
    }

}