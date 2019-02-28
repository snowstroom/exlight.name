import { Router } from 'express';
import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import * as Model from '../../../models/article';

const Article: Sequelize.Model<any, any> = Model(sequelize, Sequelize);
export const articleApi = Router();

articleApi.get('/article/:id', async (req, res, next) => {
  try {
    await Article.findOne({
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
  } catch (err) {
    console.warn(err)
  }
  res.end();
  next();
});

articleApi.post('/articles', async (req, res, next) => {
  try {
    const where = req.body.categoryId ? { category: req.body.categoryId } : {};
    const dbAnsw = await Article.findAll({
      offset: req.body.start,
      limit: req.body.limit,
      ...where
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
    await Article.create(req.body);
  } catch (err) {
    console.warn(err);
  }
  res.end();
  next();
});

articleApi.put('/article', async (req, res, next) => {
  try {
    Article.update(req.body, { where: { id: req.body.id } });
  } catch (err) {
    console.warn(err);
  }
  res.end();
  next();
})

articleApi.delete('/article/:id', async (req, res, next) => {
  try {
    Article.destroy({ where: { id: req.params.id } });
  } catch (err) {
    console.warn(err)
  }
  res.end();
  next();
});