import { ArticleNamespace } from '@share/';

export class CategoriesItem implements ArticleNamespace.ICategory {
  public readonly id: number = this.__data.id;
  public name: string = this.__data.name;
  public route: string = this.__data.route;
  public description: string = this.__data.description;

  public readonly fullRoute: string;
  public isActive: boolean;

  constructor(private __data: ArticleNamespace.ICategory, template: string) {
    this.fullRoute = template.replace('%', this.__data.route);
  }
}
