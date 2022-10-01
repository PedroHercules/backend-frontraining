"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const securityKey = process.env.SECURITY_KEY;
async function generateToken(data) {
    return jsonwebtoken_1.default.sign(data, securityKey, { expiresIn: '364d' });
}
exports.generateToken = generateToken;
async function authorize(req, res, next) {
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
    jsonwebtoken_1.default.verify(token, securityKey, async (error) => {
        if (error) {
            return res.status(401).json({ message: "Token inválido" });
        }
        next();
    });
}
exports.authorize = authorize;
