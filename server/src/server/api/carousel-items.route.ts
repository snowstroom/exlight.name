import { Router } from 'express';
import * as models from '../../../models';

export const carouselApi = Router();

carouselApi.get('/carousel-items', async (req, res, next) => {
    try {
        const dbAnsw = await models.CarouselItem.findAll({ 
            raw: true,
            attributes: ['articleId', 'imgUrl'],
            include: [{
                model: models.Article,
                as: 'article',
                attributes: ['title', 'description', 'route']
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
        await models.CarouselItem.create(req.body);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.put('/carousel-item', async (req, res, next) => {
    try {
        await models.CarouselItem.update(req.body);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.delete('/carousel-item', async (req, res, next) => {

});
