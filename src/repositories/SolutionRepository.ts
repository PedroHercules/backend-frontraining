import { Solution } from "../models/Solution";
import { Challenge } from "../models/Challenge";
import { User } from "../models/User";

interface SolutionRepositoryIF {
  challengeId?: number
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

  async all(limit: number, offset: number) {
    const solutions = await Solution.findAndCountAll({
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
      ],
      limit: limit,
      offset: offset
    });

    return solutions;
  }

  async findById(id: number) {
    const solution = await Solution.findOne({
      where: {
        id: id
      }
    });

    return solution;
  }

  async findByChallenge(id: number) {
    const solutions = await Solution.findAll({
      raw: true,
      where: {
        challengeId: id
      }
    });

    return solutions;
  }

  async findByUserId(id: number) {
    const solution = await Solution.findAll(
      { 
        where: {
          userId: id
        },

        include: [
        {
          model: Challenge,
        },
        {
          model: User,
          attributes: ["username", "email", "score"]
        }]
      }
    );

    return solution;
  }

  async update(id: number, 
    { title, repository, site, image }: SolutionRepositoryIF) {
    const solution = await Solution.update(
      {
        title,
        repository,
        site,
        image
      },
      {
        where: {
          id: id
        }
      }
    );

    return solution;
  }

  async delete(id: number) {
    const solution = await Solution.destroy({
      where: {
        id: id
      }
    });

    return solution;
  }
}

export const solutionRepository = new SolutionRepository();