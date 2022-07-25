import { ChallengeRepository,ChallengeInterface } from '../repositories/challengeRepository';
import { Request, Response } from 'express';

const challengeRepository = new ChallengeRepository();

export class ChallengeController {
  async create (req: Request, res: Response) {
    try {
      const { 
        title, 
        description, 
        level, 
        image, 
        assets, 
        colors, 
        fonts, 
        tools,
        userId 
      }: ChallengeInterface = req.body;

      if ( !userId || !title || !description || !level || !image || !assets || !colors || !fonts || !colors || !tools ) {
        return res.status(400).json({
          message: "Todos os valores são obrigatórios"
        })
      }

      const checkChallengeExists = await challengeRepository.find(title);

      if (checkChallengeExists){
        return res.status(400).json({ message: "Este desafio já existe" });
      }

      const challenge = await challengeRepository.register({
        title,
        description,
        level,
        image,
        assets,
        colors,
        fonts,
        tools,
        userId
      })

      return res.status(201).json({ challenge });
      
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({
        message: error.message
      });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const filter = req.query.level;
      let challenges: object[];
      if (filter) {
        challenges = await challengeRepository.filterByLevel(filter.toString());
      } else {
        challenges = await challengeRepository.all();
      }
      
      if (challenges.length === 0){
        return res.status(404).json({ message: "Não há desafios cadastrados" });
      }

      return res.status(200).json({ challenges });
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({
        message: error.message
      })
    }
  }
}