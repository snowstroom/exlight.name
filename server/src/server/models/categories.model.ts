import { IModel } from '../interfaces/model.inteface';
import { CATEGORIES } from '../consts/tables.const';
 
export interface ICategoryModel {
    id?: number;
    category_name: string;
    category_route: string
}

export class CategoryModel implements ICategoryModel, IModel {
    public id: number = null;
    public category_name: string = null;
    public category_route: string = null;

    constructor(data?: ICategoryModel) {
        this.init(data);
    }

    public init(data?: ICategoryModel) {
        if (data) {
            this.id = data.id || null;
            this.category_name = data.category_name;
            this.category_route = data.category_route;
        }
    }

    public getInsertQuery(): string {
        return `INSERT INTO ${CATEGORIES} (${this.category_name || 'NULL'}, ${this.category_route || ''})`;
    }    
}