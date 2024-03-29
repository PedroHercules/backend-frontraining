"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../src/database/database");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../src/server");
const image = 'H:/Layer-18.png';
beforeEach(async () => {
    await database_1.connectionDB.authenticate();
    console.log('Database connected');
    try {
        await database_1.connectionDB.sync({ force: false });
    }
    catch (error) {
        console.log(error.message);
    }
});
describe('Funcionalidades usuário', () => {
    it('Deve criar um usuário', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/user/')
            .send({
            username: 'teste4',
            email: 'teste4@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(201);
    });
    it('Deve autenticar um usuário', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/user/auth')
            .send({
            email: 'teste2@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(200);
    });
    it('Deve retornar que usuário já existe', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/user/')
            .send({
            username: 'teste2',
            email: 'teste2@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(400);
    });
    it('Deve retornar que usuário não existe', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/user/auth')
            .send({
            email: 'abc@gmail.com',
            password: '123456'
        });
        expect(response.status).toBe(404);
    });
});
describe('Funcionalidades de desafio', () => {
    it('Deve criar um desafio', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/challenge/')
            .set({
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM1MTEyMjMsImV4cCI6MTY5NDk2MDgyM30.STIoZl15NAz7JO7Q71ONfhu1WbIZu37yeZO5VSI1F7w',
            'content-type': 'multipart/form-data'
        })
            .field('title', 'teste27')
            .field('description', 'teste7')
            .field('level', '1')
            .field('assets', 'teste7')
            .field('colors', 'teste7')
            .field('fonts', 'teste7')
            .field('tools', 'teste7')
            .field('userId', 1)
            .attach('image', image);
        expect(response.status).toBe(201);
    });
    it('Deve retornar um desafio', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .get('/challenge/1');
        expect(response.status).toBe(200);
    });
    it('Deve retornar erro de autorização', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/challenge/')
            .attach('image', image)
            .field({
            title: 'teste28',
            description: 'teste',
            level: '1',
            assets: 'teste',
            colors: 'blue',
            fonts: 'teste',
            tools: 'teste',
            userId: 1
        });
        expect(response.status).toBe(401);
    });
    it('Deve retornar que desafio não existe', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .get('/challenge/200');
        expect(response.status).toBe(404);
    });
});
describe('Funcionalidades de solução', () => {
    it('Deve submeter uma solução', async () => {
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/solution/')
            .set({
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM1MTEyMjMsImV4cCI6MTY5NDk2MDgyM30.STIoZl15NAz7JO7Q71ONfhu1WbIZu37yeZO5VSI1F7w',
            'content-type': 'multipart/form-data'
        })
            .field({
            challengeId: 27,
            userId: 2,
            title: 'teste26',
            repository: 'teste',
            site: 'teste',
        })
            .attach('image', image);
        expect(response.status).toBe(200);
    });
    it('Solução deve ser recusada', async () => {
        const solutionImage = 'H:/nlw-esports.png';
        const response = await (0, supertest_1.default)(server_1.app)
            .post('/solution/')
            .set({
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM1MTEyMjMsImV4cCI6MTY5NDk2MDgyM30.STIoZl15NAz7JO7Q71ONfhu1WbIZu37yeZO5VSI1F7w',
            'content-type': 'multipart/form-data'
        })
            .field({
            challengeId: 27,
            userId: 3,
            title: 'teste27',
            repository: 'teste',
            site: 'teste',
        })
            .attach('image', solutionImage);
        expect(response.status).toBe(400);
    });
});
