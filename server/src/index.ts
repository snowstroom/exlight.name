import * as express from 'express';
import { json } from 'body-parser';
import { routes } from './api';
import { PORT } from './consts/server.const';
import * as cors from 'cors'

const app = express();

app.use(json());

app.use(cors({
    origin: [
        'http://127.0.0.1:4200',
        'http://localhost:4200',
        'http://127.0.0.1:80',
        'http://localhost:80',
        'http://127.0.0.1',
        'http://localhost',
        'http://192.168.1.200'
    ]
}));

app.use('/', ...routes);

app.listen(PORT, '0.0.0.0',
    () => console.log(`Server is start! Port ${PORT}`));