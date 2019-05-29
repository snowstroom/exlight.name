import { IApiList } from './base-api';

export interface IArticleApiList extends IApiList {
    category_id: number;
}

export interface IItemApi {
    id: number;
    route: string;
}
