import * as sequelize from "sequelize";

export interface ICategoryAtributes {
    id?: number;
    categoryName: string;
    categoryRoute: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategoryInstance extends sequelize.Instance<ICategoryAtributes>, ICategoryAtributes { }

export interface ICategoryModel extends sequelize.Model<ICategoryInstance, ICategoryAtributes> { }