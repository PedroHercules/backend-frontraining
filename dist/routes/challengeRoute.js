"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesChallenge = void 0;
const express_1 = __importDefault(require("express"));
const challengeController_1 = require("../controllers/challengeController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.routesChallenge = express_1.default.Router();
const challengeController = new challengeController_1.ChallengeController();
exports.routesChallenge.post('/', authMiddleware_1.authorize, challengeController.create);
exports.routesChallenge.get('/', challengeController.index);
