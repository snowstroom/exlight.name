import { Router } from 'express';
import * as models from '../../models';

export const addView = Router();

addView.put('/:id/view', (req, res, next) => {
    next();
});