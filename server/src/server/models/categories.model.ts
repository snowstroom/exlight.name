import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { Article } from './article.model';
 
export const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: Sequelize.STRING,
    category_route: Sequelize.STRING
});

Category.hasMany(Article, {
    foreignKey: 'category_id'
});
