import * as express from 'express';
import { json } from 'body-parser';
import { routes } from './api';
import { PORT } from './consts/server.const';
import * as cors from 'cors'

const app = express();

app.use(json());

app.use(cors({
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200']
}));

app.use('/', ...routes);

app.listen(PORT, 'localhost',
    () => console.log(`Server is start! Port ${PORT}`));