import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
 
export const Category = sequelize.define('category', {
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: Sequelize.STRING,
    category_route: Sequelize.STRING
});
