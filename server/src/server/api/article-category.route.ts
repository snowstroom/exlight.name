import { Router } from 'express';
import { server } from '../';
import { ICategoryModel, CategoryModel } from '../models/categories.model';
import { DbModel } from '../classes/db-model.class';
import { ARTICLES } from '../consts/tables.const';
import { QueryResult } from 'pg';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    console.log(req.params);
    const fields = [];
    const query = DbModel.createSelectQuery(fields, ARTICLES);
    const qyeryResult: QueryResult = await server.dbClient.query(query);
    console.log(qyeryResult);
    res.end();
    next();
});

categoriesApi.post('/article-category', async (req, res, next) => {
    const body: ICategoryModel = req.body;
    const category = new CategoryModel(body);
    const query: string = category.createInsertQuery();
    const qyeryResult: QueryResult = await server.dbClient.query(query);
    console.log(qyeryResult);
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
