"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authMiddleware_1 = require("../middleware/authMiddleware");
class UserController {
    async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "Todos os campos são obrigatórios"
                });
            }
            const checkUserExist = await userRepository_1.userRepository.findUser(username, email);
            if (checkUserExist?.username === username) {
                return res.status(400).json({ message: "Nome de usuário já existe!" });
            }
            if (checkUserExist?.email === email) {
                return res.status(400).json({ message: "E-mail já existe!" });
            }
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const user = await userRepository_1.userRepository.createUser({
                username,
                email,
                password: hashPassword
            });
            const token = await (0, authMiddleware_1.generateToken)({
                id: user.id
            });
            return res.status(201).json({ token, user });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        }
    }
    async auth(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios" });
            }
            const user = await userRepository_1.userRepository.findUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "Este usuário não é cadastrado" });
            }
            const checkPassword = await bcrypt_1.default.compare(password, user.password);
            if (!checkPassword) {
                return res.status(400).json({ message: "Senha incorreta" });
            }
            user.password = undefined;
            const token = await (0, authMiddleware_1.generateToken)({
                id: user.id
            });
            return res.status(200).json({ token, user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    async findById(req, res) {
        try {
            const id = req.query.id;
            const user = await userRepository_1.userRepository.findUserById(Number(id));
            if (!user) {
                return res.status(404).json({ message: "Este usuário não é cadastrado" });
            }
            return res.status(200).json({ user });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
}
exports.userController = new UserController();
