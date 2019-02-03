import * as Sequelize from 'sequelize';

export const sequelize = new Sequelize('exlight_name', 'postgres', '2016postgresqlMinsk', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432
});