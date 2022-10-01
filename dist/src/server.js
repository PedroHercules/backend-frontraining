"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./database/database");
const userRoute_1 = require("./routes/userRoute");
const challengeRoute_1 = require("./routes/challengeRoute");
const solutionRoute_1 = require("./routes/solutionRoute");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5000;
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.get('/', async (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
exports.app.use('/user', userRoute_1.routesUser);
exports.app.use('/challenge', challengeRoute_1.routesChallenge);
exports.app.use('/solution', solutionRoute_1.routesSolution);
exports.app.use('/uploads', express_1.default.static(path_1.default.resolve(__dirname, 'uploads')));
exports.app.listen(port, async () => {
    console.log(`[server]: Server is running at http://localhost:${port} `);
    await database_1.connectionDB.authenticate();
    console.log('Database connected');
    try {
        await database_1.connectionDB.sync({ force: false });
    }
    catch (error) {
        console.log(error.message);
    }
});
