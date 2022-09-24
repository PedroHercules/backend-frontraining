"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeRepository = void 0;
const Challenge_1 = require("../models/Challenge");
const User_1 = require("../models/User");
const sequelize_1 = require("sequelize");
const Solution_1 = require("../models/Solution");
class ChallengeRepository {
    async register({ title, description, level, image, tools, assets, colors, fonts, userId }) {
        const challenge = await Challenge_1.Challenge.create({
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
    }
    async all(order, limit, offset) {
        const challenges = await Challenge_1.Challenge.findAndCountAll({
            include: [
                {
                    model: User_1.User,
                    attributes: ["id", "username", "email", "score"]
                },
                {
                    model: Solution_1.Solution
                }
            ],
            order: [
                ['createdAt', order]
            ],
            limit: limit,
            offset: offset
        });
        return challenges;
    }
    async filterByLevel(level, order) {
        const challenges = await Challenge_1.Challenge.findAll({
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
    }
    async checkExists(title) {
        const challenge = await Challenge_1.Challenge.findOne({
            where: {
                title: title
            }
        });
        return challenge;
    }
    async findByTitle(title) {
        const challenge = await Challenge_1.Challenge.findAll({
            where: {
                title: {
                    [sequelize_1.Op.like]: "%" + title + "%"
                }
            },
            include: [{
                    model: User_1.User,
                    attributes: ["username", "email", "score"]
                }]
        });
        return challenge;
    }
    async findById(id) {
        const challenge = await Challenge_1.Challenge.findOne({
            raw: true,
            where: {
                id: id
            },
            include: [
                {
                    model: User_1.User,
                    attributes: ["username", "email", "score"]
                },
                {
                    model: Solution_1.Solution
                }
            ]
        });
        return challenge;
    }
    async findByUserId(id) {
        const challenge = await Challenge_1.Challenge.findAll({
            where: {
                userId: id
            },
            include: [{
                    model: User_1.User,
                    attributes: ["username", "email", "score"]
                }]
        });
        return challenge;
    }
    async update(id, { title, description, level, image, tools, assets, colors, fonts, userId }) {
        const challenge = await Challenge_1.Challenge.update({
            title,
            description,
            level,
            image,
            tools,
            assets,
            colors,
            fonts,
            userId
        }, {
            where: {
                id: id
            }
        });
        return challenge;
    }
    async delete(id) {
        const challenge = await Challenge_1.Challenge.destroy({
            where: {
                id: id
            }
        });
        return challenge;
    }
}
exports.challengeRepository = new ChallengeRepository();
