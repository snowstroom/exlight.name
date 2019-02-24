import { Router } from 'express';
import { Category } from '../models/categories.model';

export const categoriesApi = Router();

categoriesApi.get('/article-categories', async (req, res, next) => {
    try {
        const dbaAnsw = await Category.findAll();
        res.header({ 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dbaAnsw));
    } catch (err) {
        console.error(err);
    }
    next();
});

categoriesApi.post('/article-category', async (req, res, next) => {
    try {
        await Category.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});

categoriesApi.put('/article-category', async (req, res, next) => {
    try {
        await Category.update(req.body, { where: {
            id: req.body.id
        }});
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});

categoriesApi.delete('/article-category/:id', async (req, res, next) => {
    try {
        await Category.destroy({ where: {
            id: req.params.id
        }});
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});
