"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solutionController = void 0;
const SolutionRepository_1 = require("../repositories/SolutionRepository");
const challengeRepository_1 = require("../repositories/challengeRepository");
const compareImages_1 = __importDefault(require("resemblejs/compareImages"));
const fs_1 = __importDefault(require("fs"));
const userRepository_1 = require("../repositories/userRepository");
class SolutionController {
    async submit(req, res) {
        try {
            const { challengeId, userId, title, repository, site } = req.body;
            const image = req.file;
            if (!userId || !challengeId || !title || !repository || !site || !image) {
                return res.status(400).json({ message: "Todos os dados são obrigatórios" });
            }
            const imagePath = 'uploads/solutions/' + userId + "_" + challengeId + "_" + image?.originalname;
            const challenge = await challengeRepository_1.challengeRepository.findById(challengeId);
            if (!challenge)
                return res.status(404).json({ message: "challenge not found" });
            const options = {
                output: {
                    errorColor: {
                        red: 255,
                        green: 0,
                        blue: 255
                    },
                    transparency: 0.3,
                    largeImageThreshold: 1200,
                    useCrossOrigin: false,
                    outputDiff: true
                },
                scaleToSameSize: true,
            };
            const challengeImage = challenge.image;
            const img1 = fs_1.default.readFileSync("src/" + imagePath);
            const img2 = fs_1.default.readFileSync("src/" + challengeImage);
            const data = await (0, compareImages_1.default)(img1, img2, options);
            if (data.rawMisMatchPercentage > 50) {
                return res.status(400).json({ message: "Imagem não corresponde ao desafio" });
            }
            await userRepository_1.userRepository.updateScore(userId, Number(challenge.level));
            const solution = await SolutionRepository_1.solutionRepository.register({
                challengeId,
                userId,
                title,
                repository,
                site,
                image: imagePath
            });
            return res.status(200).json({ solution });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    async index(req, res) {
        try {
            const limit = req.query.limit;
            const offset = req.query.offset;
            const solutions = await SolutionRepository_1.solutionRepository.all(Number(limit), Number(offset));
            return res.status(200).json({ solutions });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async findByUser(req, res) {
        try {
            const UserId = Number(req.params.userId);
            if (isNaN(UserId)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const solutions = await SolutionRepository_1.solutionRepository.findByUserId(UserId);
            console.log(solutions);
            if (!solutions) {
                return res.status(404).json({ message: "Solution not found" });
            }
            return res.status(200).json({ solutions });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "Param ID must be a number" });
            }
            const { title, repository, site, userId, challengeId } = req.body;
            const image = req.file;
            const solution = await SolutionRepository_1.solutionRepository.findById(id);
            if (!solution) {
                return res.status(404).json({ message: "Solution not found" });
            }
            const imagePath = 'uploads/solutions/' + userId + "_" + challengeId + "_" + image?.originalname;
            const updatedSolution = await SolutionRepository_1.solutionRepository.update(id, {
                title,
                repository,
                site,
                image: imagePath,
                userId,
                challengeId
            });
            return res.status(200).json({ solution: updatedSolution });
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
            const solution = await SolutionRepository_1.solutionRepository.findById(id);
            if (!solution) {
                return res.status(404).json({ message: "Solution not found" });
            }
            await SolutionRepository_1.solutionRepository.delete(id);
            return res.status(200).json({
                message: "Deletado com sucesso!",
                solution
            });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.solutionController = new SolutionController();
