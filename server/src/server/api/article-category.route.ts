import { Router } from 'express';
import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import * as Model from '../../../models/category';

const Category: Sequelize.Model<any, any> = Model(sequelize, Sequelize);
export const categoriesApi = Router();

categoriesApi.get('/categories-of-articles', async (req, res, next) => {
    try {
        const dbAnsw = await Category.findAll();
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
        await Category.create(req.body);
    } catch (err) {
        console.log(err);
    }
    res.end();
    next();
});

categoriesApi.put('/category-of-articles', async (req, res, next) => {
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

categoriesApi.delete('/category-of-articles/:id', async (req, res, next) => {
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
