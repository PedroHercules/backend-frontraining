import { solutionRepository } from "../repositories/SolutionRepository";
import { Request, Response } from "express";
import { Solution } from "../models/Solution";

class SolutionController {
  async submit(req: Request, res: Response) {
    try {
      const { 
        challengeId,
        userId,
        title,
        repository,
        site
      } = req.body;

      const image = req.file;

      if (!userId || !challengeId || !title || !repository || !site || !image) {
        return res.status(400).json({ message: "Todos os dados são obrigatórios" });
      }

      const imagePath = 'uploads/solutions/' + userId + "_" + challengeId + "_" + image?.originalname;
      
      const solution = await solutionRepository.register({
        challengeId,
        userId,
        title,
        repository,
        site,
        image: imagePath
      });

      return res.status(200).json({ solution });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const solutions = await solutionRepository.all();

      return res.status(200).json({ solutions });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const solutionController = new SolutionController();