import { Router } from 'express';
import * as models from '../models';

export const articleApi = Router();

articleApi.get('/article/:id', async (req, res, next) => {
  try {
    const dbAnsw = await models.Article.findOne({
      where: {
        id: req.params.id
      }, attributes: [
        'id',
        'title',
        'route',
        'publicationDate',
        'description',
        'content',
        'views',
        'category'
      ]
    });
    res.send(dbAnsw);
  } catch (err) {
    console.warn(err)
  }
  res.end();
  next();
});

articleApi.get('/article-by-route/:route', async (req, res, next) => {
  try {
    await models.transaction(); // ??
    const dbAnsw = await models.Article.findOne({
      where: { route: req.params.route }, attributes: [
        'id',
        'title',
        'route',
        'publicationDate',
        'description',
        'content',
        'views',
        'category'
      ], raw: true
    });
    await models.Article.update({ views: ++dbAnsw.views }, {
      where: {
        route: req.params.route
      }
    });
    res.send(dbAnsw);
  } catch (err) {
    console.warn(err)
  }
  res.end();
  next();
});

articleApi.post('/articles', async (req, res, next) => {
  try {
    const where = req.body.categoryId ? { category: req.body.categoryId } : {};
    const dbAnsw = await models.Article.findAll({
      offset: req.body.start,
      limit: req.body.limit,
      attributes: ['id','title', 'route', 'publicationDate', 'description', 'views', 'category'],
      where: where
    });
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
    await models.Article.create(req.body);
  } catch (err) {
    console.warn(err);
  }
  res.end();
  next();
});

articleApi.put('/article', async (req, res, next) => {
  try {
    models.Article.update(req.body, { where: { id: req.body.id } });
  } catch (err) {
    console.warn(err);
  }
  res.end();
  next();
})

articleApi.delete('/article/:id', async (req, res, next) => {
  try {
    models.Article.destroy({ where: { id: req.params.id } });
  } catch (err) {
    console.warn(err)
  }
  res.end();
  next();
});