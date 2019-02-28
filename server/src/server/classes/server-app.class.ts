import * as express from 'express';
import { json } from 'body-parser';
import { routes } from '../api';
import { sequelize } from '../consts/db.const';
import { PORT } from '../consts/server.const';
import * as cors from 'cors'

export class Server {
    private app = express();

    public async start() {
        this.app.use(json());
        this.app.use(cors({
            allowedHeaders: 'Access-Control-Allow-Origin',
            origin: 'http://127.0.0.1:4200'
        }));
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
