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
exports.ChallengeRepository = void 0;
const Challenge_1 = require("../models/Challenge");
const User_1 = require("../models/User");
class ChallengeRepository {
    register({ title, description, level, image, tools, assets, colors, fonts, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const challenge = yield Challenge_1.Challenge.create({
                title,
                description,
                level,
                image,
                tools,
                assets,
                colors,
                fonts,
                userId
            });
            return challenge;
        });
    }
    all(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const challenges = yield Challenge_1.Challenge.findAll({
                include: [{
                        model: User_1.User,
                        attributes: ["username", "email", "score"]
                    }],
                order: [
                    ['createdAt', order]
                ]
            });
            return challenges;
        });
    }
    filterByLevel(level, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const challenges = yield Challenge_1.Challenge.findAll({
                where: {
                    level: level
                },
                include: [{
                        model: User_1.User,
                        attributes: ["username", "email", "score"]
                    }],
                order: [
                    ['createdAt', order]
                ]
            });
            return challenges;
        });
    }
    find(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const challenge = yield Challenge_1.Challenge.findOne({
                where: {
                    title: title
                },
                include: [{
                        model: User_1.User,
                        attributes: ["username", "email", "score"]
                    }]
            });
            return challenge;
        });
    }
}
exports.ChallengeRepository = ChallengeRepository;
