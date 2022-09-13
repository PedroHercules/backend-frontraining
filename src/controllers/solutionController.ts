import { solutionRepository } from "../repositories/SolutionRepository";
import { Request, Response } from "express";

import { challengeRepository } from "../repositories/challengeRepository";

import compare from 'resemblejs/compareImages';

import fs from 'fs';

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
      
      const challenge = await challengeRepository.findById(challengeId);

      if (!challenge) return res.status(404).json({ message: "challenge not found" });

      const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
      };

      const img1 = fs.readFileSync("src/" + imagePath);
      const img2 = fs.readFileSync("src/" + challenge.image);

      const data = await compare(img1, img2, options);

      if (data.rawMisMatchPercentage > 50) {
        return res.status(400).json({ message: "Imagem não corresponde ao desafio" });
      }

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

  async findByUser(req: Request, res: Response) {
    try{
      const UserId = Number(req.params.userId);
      if (isNaN(UserId)) {
        return res.status(400).json( {message: "Param ID must be a number"} );
      }

      const solutions = await solutionRepository.findByUserId(UserId);
      console.log(solutions)

      if (!solutions) {
        return res.status(404).json({ message: "Solution not found" });
      }

      return res.status(200).json({ solutions });
    } catch (error: any) {
      return res.status(500).json({message: error.message})
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Param ID must be a number" });
      }

      const {
        title,
        repository,
        site,
        userId,
        challengeId
      } = req.body;

      const image = req.file;

      const solution = await solutionRepository.findById(id);

      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }

      const imagePath = 'uploads/solutions/' + userId + "_" + challengeId + "_" + image?.originalname;

      const updatedSolution = await solutionRepository.update(id, {
        title,
        repository,
        site,
        image: imagePath,
        userId,
        challengeId
      });

      return res.status(200).json({ solution: updatedSolution });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Param ID must be a number" });
      }

      const solution = await solutionRepository.findById(id);

      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }

      await solutionRepository.delete(id);

      return res.status(200).json({ 
        message: "Solution deleted",
        solution
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const solutionController = new SolutionController();