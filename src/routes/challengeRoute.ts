import express from 'express';

import { ChallengeController } from '../controllers/challengeController';

export const routesChallenge = express.Router()

const challengeController = new ChallengeController();

routesChallenge.post('/', challengeController.create);
routesChallenge.get('/', challengeController.index)