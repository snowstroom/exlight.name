import { Router } from 'express';
import * as models from '../../models';


export const addView = Router();

addView.post('/:id/comment', (req, res, next) => {
    next();
});