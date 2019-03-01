import { Router } from 'express';
import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import * as Model from '../../../models/carouselitem';
import * as ArticleModel from '../../../models/article';

const CarouselItem: Sequelize.Model<any, any> = Model(sequelize, Sequelize);
const Article: Sequelize.Model<any, any> = ArticleModel(sequelize, Sequelize);

export const carouselApi = Router();

carouselApi.get('/carousel-items', async (req, res, next) => {
    try {
        const dbAnsw = await CarouselItem.findAll({ 
            raw: true,
            attributes: ['id', 'articleId', 'imgUrl'],
            include: [{
                model: Article,
                attributes: ['id', 'title', 'description', 'route']
            }],
            where: { active: true }
        });
        res.send(dbAnsw);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.post('/carousel-item', async (req, res, next) => {
    try {
        await CarouselItem.create(req.body);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.put('/carousel-item', async (req, res, next) => {
    try {
        await CarouselItem.update(req.body);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.delete('/carousel-item', async (req, res, next) => {

});
