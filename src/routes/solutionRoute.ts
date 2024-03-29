import express from 'express';

import { solutionController } from '../controllers/solutionController';
import { authorize } from '../middleware/authMiddleware';

import { uploadsSolution } from '../uploadMulter';

export const routesSolution = express.Router();

routesSolution.post('/', authorize, uploadsSolution.single('image'), solutionController.submit);
routesSolution.get('/', solutionController.index);
routesSolution.get('/user/:userId', solutionController.findByUser);
routesSolution.delete('/:id', authorize, solutionController.destroy);
routesSolution.put('/:id', authorize, uploadsSolution.single('image'), solutionController.update);