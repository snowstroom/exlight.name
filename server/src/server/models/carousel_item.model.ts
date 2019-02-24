import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import { Article } from './article.model';

export const CarouselItem = sequelize.define('carousel_item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    img_url: Sequelize.STRING,
    article_id: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN
});

// CarouselItem.hasOne(Article, { foreignKey: 'carousel_item_id' });
