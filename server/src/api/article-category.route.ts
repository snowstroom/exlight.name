import { Router } from 'express';
import * as models from '../models';

export const categoriesApi = Router();

categoriesApi.get('/categories-of-articles', async (req, res, next) => {
    try {
        const dbAnsw = await models.Category.findAll({
            attributes: ['id', 'categoryName', 'categoryRoute']
        });
        res.header({ 'Content-Type': 'application/json' });
        res.send(dbAnsw);
    } catch (err) {
        console.error(err);
    }
    res.end();
    next();
});

categoriesApi.post('/category-of-articles', async (req, res, next) => {
    try {
        await models.Category.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});

categoriesApi.put('/category-of-articles', async (req, res, next) => {
    try {
        await models.Category.update(req.body, { where: {
            id: req.body.id
        }});
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});

categoriesApi.delete('/category-of-articles/:id', async (req, res, next) => {
    try {
        await models.Category.destroy({ where: {
            id: req.params.id
        }});
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});
