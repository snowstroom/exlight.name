import { Router } from 'express';
import { Article } from '../models';

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
        await Article.findAll({ offset: req.query.start, limit: req.query.limit });
        res.header({ 'Content-Type': 'application/json' });
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