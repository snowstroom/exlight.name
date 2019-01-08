import { Router } from 'express';
import { server } from '@server-app';
import { ICategoryModel, CategoryModel } from '../models/categories.model';
import { DbModel, DbErrorParser } from '@classes';
import { CATEGORIES } from '@consts';
import { QueryResult } from 'pg';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    const fields = ['id', 'category_name', 'category_route'];
    const query = DbModel.createSelectQuery(fields, CATEGORIES);
    try {
        const qyeryResult: QueryResult = await server.dbClient.query(query);
        res.send(qyeryResult.rows);
    } catch (err) {
        res.sendStatus(500);
    }
    res.end();
    next();
});

categoriesApi.post('/article-category', async (req, res, next) => {
    const body: ICategoryModel = req.body;
    const category = new CategoryModel(body);
    const query: string = category.createInsertQuery();
    try {
        const qyeryResult: QueryResult = await server.dbClient.query(query);
        res.send(qyeryResult.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
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
