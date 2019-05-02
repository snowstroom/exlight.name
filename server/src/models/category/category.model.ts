import * as sequelize from 'sequelize';
import { ICategoryAtributes, ICategoryInstance, ICategoryModel } from './category.interface';
import { ArticleModel } from '../article/article.model';

const atributes: sequelize.DefineModelAttributes<ICategoryAtributes> = {
    categoryName: {
        type: sequelize.STRING,
        allowNull: false
    },
    categoryRoute: {
        type: sequelize.STRING,
        allowNull: false
    }
};

export function CategoryModel(dbase: sequelize.Sequelize): ICategoryModel {
    const model = dbase.define<ICategoryInstance, ICategoryAtributes>('category', atributes);
    model.hasMany(ArticleModel(dbase), { foreignKey: 'categoryId' });
    return model;
}

