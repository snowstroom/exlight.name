export interface IDbConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
}

export const DEV: IDbConfig = {
    database: 'exlight_name',
    dialect: 'postgres',
    host: '127.0.0.1',
    password: '2016postgresqlMinsk',
    username: 'postgres'
}