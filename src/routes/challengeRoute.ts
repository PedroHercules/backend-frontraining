import express from 'express';

import { challengeController } from '../controllers/challengeController';
import { authorize } from '../middleware/authMiddleware';

import { uploadsChallenge } from '../uploadMulter';

export const routesChallenge = express.Router()

routesChallenge.post('/', authorize, uploadsChallenge.single('image'), challengeController.create);
routesChallenge.get('/', challengeController.index);
routesChallenge.get('/:id', challengeController.get);
routesChallenge.get('/user/:userId', challengeController.getByUser);