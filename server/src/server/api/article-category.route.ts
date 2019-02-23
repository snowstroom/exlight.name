import { Router } from 'express';
import { Category } from '../models/categories.model';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    const dbaAnsw = await Category.findAll();
    console.warn(dbaAnsw);
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
