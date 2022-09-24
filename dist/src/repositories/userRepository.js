"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
class UserRepository {
    async createUser({ username, email, password }) {
        const user = await User_1.User.create({
            username,
            email,
            password
        });
        console.log(user);
        user.password = undefined;
        return user;
    }
    async findUser(username, email) {
        const user = await User_1.User.findOne({
            raw: true,
            where: {
                [sequelize_1.Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });
        return user;
    }
    async findUserByEmail(email) {
        const user = await User_1.User.findOne({
            raw: true,
            where: {
                email: email
            }
        });
        return user;
    }
    async findUserById(id) {
        const user = await User_1.User.findOne({
            raw: true,
            where: {
                id: id
            }
        });
        return user;
    }
    async updateScore(id, level) {
        const user = await User_1.User.findOne({
            where: {
                id: id
            }
        });
        user?.increment('score', { by: (10 * level) });
        return user;
    }
}
exports.userRepository = new UserRepository();
