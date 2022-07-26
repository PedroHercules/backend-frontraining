"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Challenge_1 = require("../models/Challenge");
dotenv_1.default.config();
const db_host = process.env.DB_HOST;
const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_dialect = process.env.DB_DIALECT;
exports.connectionDB = new sequelize_typescript_1.Sequelize(db_name, db_user, db_pass, {
    host: db_host,
    dialect: db_dialect
});
exports.connectionDB.addModels([User_1.User, Challenge_1.Challenge]);
