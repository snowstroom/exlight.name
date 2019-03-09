import { Router } from 'express';
import * as models from '../models';

export const carouselApi = Router();

carouselApi.get('/carousel-items', async (req, res, next) => {
    try {
       const answ = await models.Article.findAll({
            where: { inCarousel: true },
            attributes: ['title', 'route', 'description', 'carouselImg']
        });
        res.send(answ);
    } catch (err) {
        console.warn(err);
    }
    res.end();
    next();
});

carouselApi.post('/carousel-item/:id', async (req, res, next) => {
    try {
        await models.Article.update(req.body, {
            where: { id: req.params.id }
        })
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
