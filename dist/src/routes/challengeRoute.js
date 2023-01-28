"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesChallenge = void 0;
const express_1 = __importDefault(require("express"));
const challengeController_1 = require("../controllers/challengeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMulter_1 = require("../uploadMulter");
exports.routesChallenge = express_1.default.Router();
exports.routesChallenge.post('/', authMiddleware_1.authorize, uploadMulter_1.uploadsChallenge.single('image'), challengeController_1.challengeController.create);
exports.routesChallenge.get('/', challengeController_1.challengeController.index);
exports.routesChallenge.get('/:id', challengeController_1.challengeController.get);
exports.routesChallenge.get('/user/:userId', challengeController_1.challengeController.getByUser);
exports.routesChallenge.post('/search', challengeController_1.challengeController.getByTitle);
exports.routesChallenge.delete('/:id', authMiddleware_1.authorize, challengeController_1.challengeController.destroy);
exports.routesChallenge.put('/:id', authMiddleware_1.authorize, uploadMulter_1.uploadsChallenge.single('image'), challengeController_1.challengeController.update);
