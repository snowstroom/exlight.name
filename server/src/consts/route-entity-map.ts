import { ACCESS_ENTITY } from 'src/models/access.model';
import { ARTICLE_ENTITY } from 'src/models/article.model';
import { CATEGORY_ENTITY } from 'src/models/category.model';

export enum E_HTTP_METHODS {
    GET,
    POST,
    PUT,
    DELETE,
}

export interface IRouteDescriptor {
    entity: string; // string[]
    access: number;
    path: RegExp;
    method: E_HTTP_METHODS;
    children?: IRouteDescriptor[];
}

export interface IRouteDescriptor2 {
    entity: string;
    access: number;
}
// Super, Create, Read, Update, Delete
export const CREATE = 0b01000;
export const READ = 0b00100;
export const UPDATE = 0b00010;
export const DELETE = 0b00001;

export const ROUTE_ENTITY_MAP: IRouteDescriptor[] = [
    // Access controller
    {
        entity: ACCESS_ENTITY,
        access: CREATE,
        method: E_HTTP_METHODS.POST,
        path: new RegExp(''),
    }, {
        entity: ARTICLE_ENTITY,
        access: CREATE,
        method: E_HTTP_METHODS.POST,
        path: new RegExp('/api/article/item'),
    }, {
        entity: ARTICLE_ENTITY,
        access: UPDATE,
        method: E_HTTP_METHODS.PUT,
        path: new RegExp(/\/api\/article\/item\/\d/),
    }, {
        entity: ARTICLE_ENTITY,
        access: READ,
        method: E_HTTP_METHODS.GET,
        path: new RegExp(/\/api\/article\/item\/\d/),
    },
    // Category
    {
        entity: CATEGORY_ENTITY,
        path: new RegExp('/api/category'),
        method: E_HTTP_METHODS.POST,
        access: CREATE,
    }, {
        entity: CATEGORY_ENTITY,
        path: new RegExp(/\/api\/category\/\d/),
        method: E_HTTP_METHODS.GET,
        access: READ,
    }, {
        entity: CATEGORY_ENTITY,
        path: new RegExp(/\/api\/category\/\d/),
        method: E_HTTP_METHODS.DELETE,
        access: DELETE,
    }];
