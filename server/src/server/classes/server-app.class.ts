import * as express from 'express';
import { json } from 'body-parser';
import { routes } from '../api';
import { sequelize } from '../consts/db.const';
import { PORT } from '../consts/server.const';

export class Server {
    private app = express();

    constructor() {}

    public async start() {
        this.app.use(json());
        this.app.use('/', ...routes);
        this.app.listen(PORT, 'localhost', () => console.log(`Server is start! Port ${PORT}`));
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (err) {
            console.error('Unable to connect to the database:', err);
        }
    }

}
