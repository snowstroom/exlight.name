import { Router } from 'express';
import { server } from '../';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});

categoriesApi.post('/article-category', (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});

categoriesApi.delete('/article-category', (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});
