import * as express from 'express';
import { json } from 'body-parser';
import { Client } from 'pg';
import { routes } from '../api';
import { dbConf } from '../consts/db.const';
import { PORT } from '../consts/server.const';

export class Server {
    private app = express();
    public dbClient = new Client(dbConf);

    constructor() {
    }

    public async start() {
        this.app.use(json());
        this.app.use('/', ...routes);
        this.app.listen(PORT, 'localhost', () => console.log(`Server is start! Port ${PORT}`));
        try {
            await this.dbClient.connect();
        } catch (err) {
            console.log(err);
        }
    }

}
