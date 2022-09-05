import { challengeRepository } from '../repositories/challengeRepository';
import { Request, Response } from 'express';


class ChallengeController {
  async create (req: Request, res: Response) {
    try {
      const {
        title, 
        description, 
        level, 
        assets, 
        colors, 
        fonts, 
        tools,
        userId 
      } = req.body;

      const image = req.file;

      if ( !userId || !title || !description || !level || !assets || !colors || !fonts || !colors || !tools ) {
        return res.status(400).json({
          message: "Todos os valores são obrigatórios"
        })
      }

      const checkChallengeExists = await challengeRepository.checkExists(title);

      if (checkChallengeExists){
        return res.status(400).json({ message: "Este desafio já existe" });
      }

      const imagePath = 'uploads/' + title + "_" + image?.originalname;

      const challenge = await challengeRepository.register({
        title,
        description,
        level,
        image: imagePath,
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
      const level = req.query.level;
      const order = req.query.order || 'DESC';
      let challenges: object[];
      if (level) {
        challenges = await challengeRepository.filterByLevel(level.toString(), order?.toString());
      } else {
        challenges = await challengeRepository.all(order?.toString());
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

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json( {message: "Param ID must be a number"} );
      }
      const challenge = await challengeRepository.findById(id);

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      return res.status(200).json({ challenge });
    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async getByTitle(req: Request, res: Response) {
    try {
      const { search } = req.body;
      const challenges = await challengeRepository.findByTitle(search);

      return res.status(200).json( { challenges } );
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getByUser(req: Request, res: Response) {
    try{
      const UserId = Number(req.params.userId);
      if (isNaN(UserId)) {
        return res.status(400).json( {message: "Param ID must be a number"} );
      }

      const challenges = await challengeRepository.findByUserId(UserId);

      if (!challenges) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      return res.status(200).json({ challenges });
    } catch (error: any) {
      return res.status(500).json({message: error.message})
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const {
        title, 
        description, 
        level, 
        assets, 
        colors, 
        fonts, 
        tools,
        userId 
      } = req.body;

      const image = req.file;

      if (isNaN(id)) {
        return res.status(400).json( {message: "Param ID must be a number"} );
      }

      const challenge = await challengeRepository.findById(id);

      if (!challenge) {
        return res.status(404).json({ message: "Challenge not found" });
      }

      if (challenge.solutions.length > 0) {
        return res.status(400).json({ 
          message: "Desafio já possui soluções, não é possível alterar!"
        });
      }

      const imagePath = 'uploads/' + title + "_" + image?.originalname;

      const updated = await challengeRepository.update(id, {
        title,
        description,
        level,
        image: imagePath,
        assets,
        colors,
        fonts,
        tools,
        userId
      });

      return res.status(200).json({ 
        message: "Challenge updated",
        challenge: updated
      });
    }catch(error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json( {message: "Param ID must be a number"} );
      }

      const challenge = await challengeRepository.findById(id);

      if (!challenge) {
        return res.status(404).json({ message: "Este desafio não existe!" })
      }
      
      if (challenge.solutions.length > 0) {
        return res.status(400).json({ 
          message: "Este desafio já possui soluções, não é possível deletá-lo!" 
        })
      }
      
      await challengeRepository.delete(id);

      return res.status(200).json({ 
        message: "Deletado com sucesso!",
        challenge
      });
    }catch(error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const challengeController = new ChallengeController();