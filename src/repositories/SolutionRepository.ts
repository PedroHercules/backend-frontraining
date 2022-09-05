import { Solution } from "../models/Solution";
import { Challenge } from "../models/Challenge";
import { User } from "../models/User";

interface SolutionRepositoryIF {
  challengeId: number
  userId: number
  title: string
  repository: string
  site: string
  image: string
}

class SolutionRepository {
  async register({ challengeId, userId, title, repository, site, image }: SolutionRepositoryIF) {
    const solution = await Solution.create({
      challengeId,
      userId,
      title,
      repository,
      site,
      image
    });

    return solution;
  }

  async all() {
    const solutions = await Solution.findAll({
      include: [
        {
          model: Challenge,
        },
        {
          model: User,
          attributes: ['username', 'email', 'score']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });

    return solutions;
  }

  async findByUserId(id: number) {
    const solution = await Solution.findAll(
      { 
        where: {
          userId: id
        },

        include: [{
          model: User,
          attributes: ["username", "email", "score"]
        }]
      }
    );

    return solution;
  }
}

export const solutionRepository = new SolutionRepository();