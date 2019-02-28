import { Router } from 'express';
import { sequelize } from '../consts/db.const';
import * as Sequelize from 'sequelize';
import * as Model from '../../../models/carouselitem';

const CarouselItem: Sequelize.Model<any, any> = Model(sequelize, Sequelize);

export const carouselApi = Router();

carouselApi.get('/carousel-items', async (req, res, next) => {

});

carouselApi.post('/carousel-item', async (req, res, next) => {

});

carouselApi.put('/carousel-item', async (req, res, next) => {

});

carouselApi.delete('/carousel-item', async (req, res, next) => {

});
