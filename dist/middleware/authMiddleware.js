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
exports.authorize = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRepository_1 = require("../repositories/userRepository");
dotenv_1.default.config();
const securityKey = process.env.SECURITY_KEY;
const userRepository = new userRepository_1.UserRepository();
function generateToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign(data, securityKey, { expiresIn: '1d' });
    });
}
exports.generateToken = generateToken;
function authorize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Token não foi informado" });
        }
        const tokenParts = authorization.split(' ');
        if (tokenParts.length !== 2) {
            return res.status(401).json({ message: "Token error" });
        }
        const [scheme, token] = tokenParts;
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: "Erro no formato do token" });
        }
        jsonwebtoken_1.default.verify(token, securityKey, (error) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                return res.status(401).json({ message: "Token inválido" });
            }
            next();
        }));
    });
}
exports.authorize = authorize;
