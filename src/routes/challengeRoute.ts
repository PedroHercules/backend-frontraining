import express from 'express';

import { challengeController } from '../controllers/challengeController';
import { authorize } from '../middleware/authMiddleware';

import { uploads } from '../uploadMulter';

export const routesChallenge = express.Router()

routesChallenge.post('/', authorize, uploads.single('image'), challengeController.create);
routesChallenge.get('/', challengeController.index);
routesChallenge.get('/:id', challengeController.get);