import { IApiList } from './base-api';

export interface ICommentaryApiListParams extends IApiList {
    articleId: number;
}

export interface ICommentaryApiParams {
    id: number;
    articleId: number;
}
