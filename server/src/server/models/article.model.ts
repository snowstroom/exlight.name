import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';

export const Article = sequelize.define('article', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    article_title: Sequelize.STRING,
    article_route: Sequelize.STRING,
    publication_date: Sequelize.DATE,
    article_description: Sequelize.STRING,
    category_id: Sequelize.NUMBER,
    carousel_item_id: Sequelize.NUMBER,
    content: Sequelize.TEXT,
    views: Sequelize.NUMBER
});
