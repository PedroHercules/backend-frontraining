import express from 'express';

import { UserController } from '../controllers/userController';

export const routesUser = express.Router();

const userController = new UserController();

routesUser.post('/', userController.registerUser);
routesUser.post('/auth', userController.auth);