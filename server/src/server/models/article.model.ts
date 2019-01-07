import { ARTICLES } from '../consts/tables.const';
import { DbModel } from '../classes/db-model.class';
import { IDataModel } from '../interfaces/model.inteface';

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

export class ArticleModel extends DbModel {
    public id: number = null;
    public tableName: string = ARTICLES;
    public data: IDataModel = {
        article_title: null,
        article_route: null,
        publication_date: null,
        article_description: null,
        category_id: null,
        content: null,
        views: null
    }

    constructor(data?: Partial<IArticleModel>) {
        super();
        this.init(data);
    }

    public init(data?: Partial<IArticleModel>) {
        if (data) {
            this.id = data.id;
            this.data.article_title = data.article_title || null;
            this.data.article_route = data.article_route || null;
            this.data.publication_date = data.publication_date || null;
            this.data.article_description = data.article_description || null;
            this.data.category_id = data.category_id || null;
            this.data.content = data.content || null;
            this.data.views = data.views || null;
        }
    }

}