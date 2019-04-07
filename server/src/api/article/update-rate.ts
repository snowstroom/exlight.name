import { Router } from 'express';
import * as models from '../../models';


export const addView = Router();

addView.put('/:id/rating/:rate', (req, res, next) => {
    next();
});