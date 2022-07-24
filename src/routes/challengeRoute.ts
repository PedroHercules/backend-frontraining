import express from 'express';

import { ChallengeController } from '../controllers/challengeController';
import { authorize } from '../middleware/authMiddleware';

export const routesChallenge = express.Router()

const challengeController = new ChallengeController();

routesChallenge.post('/', authorize, challengeController.create);
routesChallenge.get('/', challengeController.index)