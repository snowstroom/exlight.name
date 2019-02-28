export interface ICategoriesItem {
    id: number;
    categoryName: string;
    categoryRoute: string;
}

export class CategoriesItem implements ICategoriesItem {
    public readonly id: number = this.__data.id;
    public categoryName: string = this.__data.categoryName;
    public categoryRoute: string = this.__data.categoryRoute;

    public isActive: boolean;

    constructor(private __data: ICategoriesItem) {}
}
