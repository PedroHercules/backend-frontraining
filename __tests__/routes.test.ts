import { Sequelize } from 'sequelize-typescript';
import { connectionDB } from '../src/database/database';
import request from 'supertest';
import { userRepository } from '../src/repositories/userRepository';
import { app } from '../src/server';
import fs from 'fs';

const image = 'C:/tip-calculator.png';

beforeEach(async () => {
  await connectionDB.authenticate();
  console.log('Database connected')
  try {
    await connectionDB.sync({ force: false });
  } catch (error: any) {
    console.log(error.message)
  }
})

jest.setTimeout(10000)

describe('Funcionalidades usuário', () => {
  it('Deve criar um usuário', async () => {
    const response = await request(app)
      .post('/user/')
      .send({
        username: 'UserTeste10',
        email: 'marcost10@gmail.com',
        password: '739994Pa@'
      })

    expect(response.status).toBe(201);
  })

  it('Deve autenticar um usuário', async () => {
    const response = await request(app)
    .post('/user/auth')
    .send({
      email: 'marcos@gmail.com',
      password: '739994Pa@'
    })

    expect(response.status).toBe(200);
  })

  it('Deve retornar que usuário já existe', async () => {
    const response = await request(app)
      .post('/user/')
      .send({
        username: 'Marcos',
        email: 'marcos@gmail.com',
        password: '739994Pa@'
      })

    expect(response.status).toBe(400);
  })

  it('Deve retornar que usuário não existe', async () => {
    const response = await request(app)
    .post('/user/auth')
    .send({
      email: 'abc@gmail.com',
      password: '123456'
    })

    expect(response.status).toBe(404);
  })
})

describe('Funcionalidades de desafio', () => {
  it('Deve criar um desafio', async () => {
    const response = await request(app)
      .post('/challenge/')
      .set({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM3MDIxOTUsImV4cCI6MTY5NTE1MTc5NX0.vKgfAmVv0WRkXvC7dWNoa-WC3KAp-GRpMcActQ8SV6c',
        'content-type': 'multipart/form-data'
      })
      .field('title', 'teste21')
      .field('description', 'teste7')
      .field('level', '1')
      .field('assets', 'teste7')
      .field('colors', 'teste7')
      .field('fonts', 'teste7')
      .field('tools', 'teste7')
      .field('userId', 3)
      .attach('image', image)
      

    expect(response.status).toBe(201);
  })

  it('Deve retornar um desafio', async () => {
    const response = await request(app)
    .get('/challenge/15')

    expect(response.status).toBe(200);
  })

  // it('Deve retornar erro de autorização', async () => {
  //   const response = await request(app)
  //     .post('/challenge/')
  //     .attach('image', image)
  //     .field({
  //       title: 'teste28',
  //       description: 'teste',
  //       level: '1',
  //       assets: 'teste',
  //       colors: 'blue',
  //       fonts: 'teste',
  //       tools: 'teste',
  //       userId: 3
  //     })

  //   expect(response.status).toBe(401);
  // })

  it('Deve retornar que desafio não existe', async () => {
    const response = await request(app)
    .get('/challenge/200')

    expect(response.status).toBe(404);
  })
})

describe('Funcionalidades de solução', () => {
  it('Deve submeter uma solução', async () => {
    const response = await request(app)
      .post('/solution/')
      .set({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM3MDIxOTUsImV4cCI6MTY5NTE1MTc5NX0.vKgfAmVv0WRkXvC7dWNoa-WC3KAp-GRpMcActQ8SV6c',
        'content-type': 'multipart/form-data'
      })
      .field({
        challengeId: 20,
        userId: 3,
        title: 'teste27-1',
        repository: 'teste',
        site: 'teste',
      })
      .attach('image', image)
    expect(response.status).toBe(200);
  })

  it('Solução deve ser recusada', async () => {
    const solutionImage = 'C:/Users/Marcos/Pictures/solucoes/our-price.png';
    const response = await request(app)
      .post('/solution/')
      .set({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjM3MDIxOTUsImV4cCI6MTY5NTE1MTc5NX0.vKgfAmVv0WRkXvC7dWNoa-WC3KAp-GRpMcActQ8SV6c',
        'content-type': 'multipart/form-data'
      })
      .field({
        challengeId: 15,
        userId: 3,
        title: 'teste27',
        repository: 'teste',
        site: 'teste',
      })
      .attach('image', solutionImage)
    expect(response.status).toBe(400);
  })
})