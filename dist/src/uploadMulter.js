"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsSolution = exports.uploadsChallenge = void 0;
const multer_1 = __importDefault(require("multer"));
const storageChallenge = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "src/uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, req.body.title + "_" + file.originalname);
    }
});
const storageSolution = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "src/uploads/solutions/");
    },
    filename: function (req, file, callback) {
        const challengeId = req.body.challengeId;
        callback(null, req.body.userId + "_" + challengeId + "_" + file.originalname);
    }
});
exports.uploadsChallenge = (0, multer_1.default)({ storage: storageChallenge });
exports.uploadsSolution = (0, multer_1.default)({ storage: storageSolution });
