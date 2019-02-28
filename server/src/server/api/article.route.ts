import { Router } from 'express';
import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import * as Model from '../../../models/article';

const Article: Sequelize.Model<any, any> = Model(sequelize, Sequelize);
export const articleApi = Router();

articleApi.get('/article/:id', async (req, res, next) => {
    try {
        await Article.findOne({ where : {
            id: req.params.id
        }});
    } catch (err) {
        console.warn(err)
    }
    res.end();
    next();
});

articleApi.get('/articles', async (req, res, next) => {
    try {
        const dbAnsw = await Article.findAll({ offset: req.query.start, limit: req.query.limit });
        res.header({ 'Content-Type': 'application/json' });
        res.send(dbAnsw);
    } catch (err) {
        console.warn(err)
    }
    res.end();
    next();
});

articleApi.post('/article', async (req, res, next) => {
    try {
        await Article.create(req.body);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

articleApi.put('/article', async (req, res, next) => {
    try {
        Article.update(req.body, { where: { id: req.body.id }});
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
})

articleApi.delete('/article/:id', async (req, res, next) => {
    try {
        Article.destroy({ where: { id: req.params.id }});
    } catch (err) {
        console.warn(err)
    }
    res.end();
    next();
});