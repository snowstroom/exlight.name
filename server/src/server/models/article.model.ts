import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { CarouselItem } from './carousel_item.model';
import { Category } from './categories.model';

export const Article = sequelize.define('Article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: Sequelize.STRING,
    route: Sequelize.STRING,
    publicationDate: Sequelize.DATE,
    description: Sequelize.STRING,
    // category: Sequelize.INTEGER,
    carouselItem: Sequelize.INTEGER,
    content: Sequelize.TEXT,
    views: Sequelize.INTEGER
});

Article.hasOne(CarouselItem, { foreignKey: 'article_id' });
