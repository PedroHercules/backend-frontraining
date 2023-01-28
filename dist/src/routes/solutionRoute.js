"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesSolution = void 0;
const express_1 = __importDefault(require("express"));
const solutionController_1 = require("../controllers/solutionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMulter_1 = require("../uploadMulter");
exports.routesSolution = express_1.default.Router();
exports.routesSolution.post('/', authMiddleware_1.authorize, uploadMulter_1.uploadsSolution.single('image'), solutionController_1.solutionController.submit);
exports.routesSolution.get('/', solutionController_1.solutionController.index);
exports.routesSolution.get('/user/:userId', solutionController_1.solutionController.findByUser);
exports.routesSolution.delete('/:id', authMiddleware_1.authorize, solutionController_1.solutionController.destroy);
exports.routesSolution.put('/:id', authMiddleware_1.authorize, uploadMulter_1.uploadsSolution.single('image'), solutionController_1.solutionController.update);
