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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const userRepository = new userRepository_1.UserRepository();
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                if (!username || !email || !password) {
                    return res.status(400).json({
                        message: "Todos os campos são obrigatórios"
                    });
                }
                const checkUserExist = yield userRepository.findUser(username, email);
                if ((checkUserExist === null || checkUserExist === void 0 ? void 0 : checkUserExist.username) === username) {
                    return res.status(400).json({ message: "Nome de usuário já existe!" });
                }
                if ((checkUserExist === null || checkUserExist === void 0 ? void 0 : checkUserExist.email) === email) {
                    return res.status(400).json({ message: "E-mail já existe!" });
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield userRepository.createUser({
                    username,
                    email,
                    password: hashPassword
                });
                return res.status(201).json({ user });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: error
                });
            }
        });
    }
    auth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
                }
                const user = yield userRepository.findUserByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Este usuário não é cadastrado" });
                }
                const checkPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!checkPassword) {
                    return res.status(400).json({ message: "Senha incorreta" });
                }
                user.password = undefined;
                const token = yield (0, authMiddleware_1.generateToken)({
                    id: user.id
                });
                return res.status(200).json({ token, user });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
