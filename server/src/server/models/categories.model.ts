import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { Article } from './article.model';
 
export const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: Sequelize.STRING,
    categoryRoute: Sequelize.STRING
});

Category.hasMany(Article, { foreignKey: 'category' });
