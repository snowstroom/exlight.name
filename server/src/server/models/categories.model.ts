import { IDataModel } from '../interfaces/model.inteface';
import { CATEGORIES } from '../consts/tables.const';
import { DbModel } from '../classes/db-model.class';
 
export interface ICategoryModel {
    id?: number;
    category_name: string;
    category_route: string
}

export class CategoryModel extends DbModel {
    public id: number = null;
    public tableName: string = CATEGORIES;
    public data: IDataModel = {
        category_name: null,
        category_route: null
    }
    
    constructor(data?: ICategoryModel) {
        super();
        this.init(data);
    }

    public init(data?: ICategoryModel) {
        if (data) {
            this.id = data.id || null;
            this.data.category_name = data.category_name;
            this.data.category_route = data.category_route;
        }
    }   
}