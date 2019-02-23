import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';

export const Photo = sequelize.define('photo', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    img_url: Sequelize.STRING,
    photo_description: Sequelize.STRING,
    views: Sequelize.INTEGER
});
