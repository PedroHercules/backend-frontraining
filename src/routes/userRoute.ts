import express from 'express';

import { userController } from '../controllers/userController';

export const routesUser = express.Router();

routesUser.post('/', userController.registerUser);
routesUser.post('/auth', userController.auth);
routesUser.get('/find', userController.findById);
routesUser.post('/forgot_password', userController.sendResetLink);
routesUser.post('/reset_password/:token', userController.resetPassword);