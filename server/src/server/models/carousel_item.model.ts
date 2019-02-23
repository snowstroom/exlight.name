import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { Article } from './article.model';

export const CarouselItem = sequelize.define('carousel_item', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    img_url: Sequelize.STRING,
    article_id: Sequelize.NUMBER,
    active: Sequelize.BOOLEAN
}).hasOne(Article.source, {
    foreignKey: 'carousel_item_id'
});
