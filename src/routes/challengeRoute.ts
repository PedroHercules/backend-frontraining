import express from 'express';

import { ChallengeController } from '../controllers/challengeController';
import { authorize } from '../middleware/authMiddleware';

import { uploads } from '../uploadMulter';

export const routesChallenge = express.Router()

const challengeController = new ChallengeController();

routesChallenge.post('/', authorize, uploads.single('image'), challengeController.create);
routesChallenge.get('/', challengeController.index)