import { ICategory } from '@account-module/interfaces/category';

export class Category implements ICategory {
  public name: string;
  public route: string;
  public template: string;
  public readonly fullRoute: string;

  constructor(cat: ICategory) {
    this.name = cat.name;
    this.route = cat.route;
    this.fullRoute = cat.template.replace('%', cat.route);
  }
}
