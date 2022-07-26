"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesUser = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.routesUser = express_1.default.Router();
const userController = new userController_1.UserController();
exports.routesUser.post('/', userController.registerUser);
exports.routesUser.post('/auth', userController.auth);
