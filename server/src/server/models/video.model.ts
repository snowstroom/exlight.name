import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';

export const Video = sequelize.define('video', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
    },
    video_url: Sequelize.STRING
});
