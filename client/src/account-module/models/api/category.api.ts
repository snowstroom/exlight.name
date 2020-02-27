import { ArticleNamespace } from '@share/';

export class CategoryApi implements ArticleNamespace.ICategory {
  public readonly id: number = this.__data.id;
  public name: string = this.__data.name;
  public route: string = this.__data.route;
  public description: string = this.__data.description;

  constructor(private __data: ArticleNamespace.ICategory) {}
}
