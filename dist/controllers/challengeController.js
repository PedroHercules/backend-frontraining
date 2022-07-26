"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeController = void 0;
const challengeRepository_1 = require("../repositories/challengeRepository");
const challengeRepository = new challengeRepository_1.ChallengeRepository();
class ChallengeController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, level, image, assets, colors, fonts, tools, userId } = req.body;
                if (!userId || !title || !description || !level || !image || !assets || !colors || !fonts || !colors || !tools) {
                    return res.status(400).json({
                        message: "Todos os valores são obrigatórios"
                    });
                }
                const checkChallengeExists = yield challengeRepository.find(title);
                if (checkChallengeExists) {
                    return res.status(400).json({ message: "Este desafio já existe" });
                }
                const challenge = yield challengeRepository.register({
                    title,
                    description,
                    level,
                    image,
                    assets,
                    colors,
                    fonts,
                    tools,
                    userId
                });
                return res.status(201).json({ challenge });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: error.message
                });
            }
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const level = req.query.level;
                const order = req.query.order || 'DESC';
                let challenges;
                if (level) {
                    challenges = yield challengeRepository.filterByLevel(level.toString(), order === null || order === void 0 ? void 0 : order.toString());
                }
                else {
                    challenges = yield challengeRepository.all(order === null || order === void 0 ? void 0 : order.toString());
                }
                if (challenges.length === 0) {
                    return res.status(404).json({ message: "Não há desafios cadastrados" });
                }
                return res.status(200).json({ challenges });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: error.message
                });
            }
        });
    }
}
exports.ChallengeController = ChallengeController;
