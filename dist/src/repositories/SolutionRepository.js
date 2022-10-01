"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solutionRepository = void 0;
const Solution_1 = require("../models/Solution");
const Challenge_1 = require("../models/Challenge");
const User_1 = require("../models/User");
class SolutionRepository {
    async register({ challengeId, userId, title, repository, site, image }) {
        const solution = await Solution_1.Solution.create({
            challengeId,
            userId,
            title,
            repository,
            site,
            image
        });
        return solution;
    }
    async all(limit, offset) {
        const solutions = await Solution_1.Solution.findAndCountAll({
            include: [
                {
                    model: Challenge_1.Challenge,
                },
                {
                    model: User_1.User,
                    attributes: ['username', 'email', 'score']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: limit,
            offset: offset
        });
        return solutions;
    }
    async findById(id) {
        const solution = await Solution_1.Solution.findOne({
            where: {
                id: id
            }
        });
        return solution;
    }
    async findByUserId(id) {
        const solution = await Solution_1.Solution.findAll({
            where: {
                userId: id
            },
            include: [
                {
                    model: Challenge_1.Challenge,
                },
                {
                    model: User_1.User,
                    attributes: ["username", "email", "score"]
                }
            ]
        });
        return solution;
    }
    async update(id, { title, repository, site, image }) {
        const solution = await Solution_1.Solution.update({
            title,
            repository,
            site,
            image
        }, {
            where: {
                id: id
            }
        });
        return solution;
    }
    async delete(id) {
        const solution = await Solution_1.Solution.destroy({
            where: {
                id: id
            }
        });
        return solution;
    }
}
exports.solutionRepository = new SolutionRepository();
