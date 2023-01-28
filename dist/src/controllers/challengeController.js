"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeController = void 0;
const challengeRepository_1 = require("../repositories/challengeRepository");
class ChallengeController {
    async create(req, res) {
        try {
            const { title, description, level, assets, colors, fonts, tools, userId } = req.body;
            const image = req.file;
            if (!userId || !title || !description || !level || !assets || !colors || !fonts || !colors || !tools) {
                return res.status(400).json({
                    message: "Todos os valores são obrigatórios"
                });
            }
            const checkChallengeExists = await challengeRepository_1.challengeRepository.checkExists(title);
            if (checkChallengeExists) {
                return res.status(400).json({ message: "Este desafio já existe" });
            }
            const imagePath = 'uploads/' + title + "_" + image?.originalname;
            const challenge = await challengeRepository_1.challengeRepository.register({
                title,
                description,
                level,
                image: imagePath,
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
    }
    async index(req, res) {
        try {
            const level = req.query.level;
            const order = req.query.order || 'DESC';
            const limit = req.query.limit;
            const offset = req.query.offset;
            let challenges;
            challenges = await challengeRepository_1.challengeRepository.all(order?.toString(), Number(limit), Number(offset));
            if (challenges.rows.length === 0) {
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
    }
    async get(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const challenge = await challengeRepository_1.challengeRepository.findById(id);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            return res.status(200).json({ challenge });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getByTitle(req, res) {
        try {
            const { search } = req.body;
            const challenges = await challengeRepository_1.challengeRepository.findByTitle(search);
            return res.status(200).json({ challenges });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getByUser(req, res) {
        try {
            const UserId = Number(req.params.userId);
            if (isNaN(UserId)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const challenges = await challengeRepository_1.challengeRepository.findByUserId(UserId);
            if (!challenges) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            return res.status(200).json({ challenges });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { title, description, level, assets, colors, fonts, tools, userId } = req.body;
            const image = req.file;
            if (isNaN(id)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const challenge = await challengeRepository_1.challengeRepository.findById(id);
            if (!challenge) {
                return res.status(404).json({ message: "Challenge not found" });
            }
            if (challenge.solutions.length > 0) {
                return res.status(400).json({
                    message: "Desafio já possui soluções, não é possível alterar!"
                });
            }
            const imagePath = 'uploads/' + title + "_" + image?.originalname;
            const updated = await challengeRepository_1.challengeRepository.update(id, {
                title,
                description,
                level,
                image: imagePath,
                assets,
                colors,
                fonts,
                tools,
                userId
            });
            return res.status(200).json({
                message: "Challenge updated",
                challenge: updated
            });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async destroy(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const challenge = await challengeRepository_1.challengeRepository.findById(id);
            if (!challenge) {
                return res.status(404).json({ message: "Este desafio não existe!" });
            }
            if (challenge.solutions.length > 0) {
                return res.status(400).json({
                    message: "Este desafio já possui soluções, não é possível deletá-lo!"
                });
            }
            await challengeRepository_1.challengeRepository.delete(id);
            return res.status(200).json({
                message: "Deletado com sucesso!",
                challenge
            });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.challengeController = new ChallengeController();
