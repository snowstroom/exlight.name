import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { CarouselItem } from './carousel_item.model';
import { Category } from './categories.model';

export const Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    article_title: Sequelize.STRING,
    article_route: Sequelize.STRING,
    publication_date: Sequelize.DATE,
    article_description: Sequelize.STRING,
    category_id: Sequelize.INTEGER,
    carousel_item_id: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    views: Sequelize.INTEGER
});

Article.belongsToMany(CarouselItem, { through: 'article_id' });
