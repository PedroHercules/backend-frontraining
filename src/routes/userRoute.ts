import express from 'express';

import { userController } from '../controllers/userController';

export const routesUser = express.Router();

routesUser.post('/', userController.registerUser);
routesUser.post('/auth', userController.auth);