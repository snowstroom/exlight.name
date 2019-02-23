import { Router } from 'express';
import { server } from '@server-app';
import { QueryResult } from 'pg';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    const fields = ['id', 'category_name', 'category_route'];
    res.end();
    next();
});

categoriesApi.post('/article-category', async (req, res, next) => {
    res.end();
    next();
});

categoriesApi.put('/article-category/:id', async (req, res, next) => {
    console.log(req.params);
    res.end();
    next();
});

categoriesApi.delete('/article-category/:id', async (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});
