import { CoreNamespace } from './core.namespace';
export namespace ArticleNamespace {
  export interface IArticle {
    id?: number;
    title: string;
    publicationDate?: string | Date;
    description: string;
    content: string;
    views: number;
    categoryId: number;
    author: number;
    route: string;
    // rating: number;
    // isAppreciated: boolean;
  }

  export interface ICategory {
    id?: number;
    route: string;
    name: string;
    description: string;
  }

  export interface IArticleCommentary extends CoreNamespace.ICommentary {
    articleId?: number;
  }

  export interface IRating {
    id?: number;
    userId?: number;
    articleId?: number;
    rating: RatingNumber;
    dateOfCreate: Date;
  }

  export type RatingNumber = 0 | 1 | 2 | 3 | 4 | 5;

  export interface IRatingInfo {
    min: RatingNumber;
    max: RatingNumber;
    avarage: RatingNumber;
  }
}
