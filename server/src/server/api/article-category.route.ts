import { Router } from 'express';
import { server } from '../';
import { ICategoryModel, CategoryModel } from '../models/categories.model';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});

categoriesApi.post('/article-category', async (req, res, next) => {
    const body: ICategoryModel = req.body;
    const category = new CategoryModel(body);
    await server.dbClient.query(category.createInsertQuery());
    res.end();
    next();
});

categoriesApi.put('/article-category/:id', async (req, res, next) => {
    res.end();
    next();
});

categoriesApi.delete('/article-category/:id', async (req, res, next) => {
    console.log(req.body);
    res.end();
    next();
});
