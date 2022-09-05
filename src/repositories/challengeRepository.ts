import { Challenge } from '../models/Challenge';
import { User } from '../models/User';
import { Op } from 'sequelize';

export interface ChallengeInterface {
  title: string
  description: string
  level: string
  image: string
  tools: string
  assets: string
  colors: string
  fonts: string
  userId: number
}

class ChallengeRepository {
  async register( { title, description, level, image, tools, assets, colors, fonts, userId }: ChallengeInterface ) {
    const challenge = await Challenge.create({
      title,
      description,
      level,
      image,
      tools,
      assets,
      colors,
      fonts,
      userId
    });

    return challenge;
  } 

  async all(order: string) {
    const challenges = await Challenge.findAll({
      include: [{
        model: User,
        attributes: ["username", "email", "score"]
      }],
      order: [
        ['createdAt', order]
      ]
    });
    return challenges;
  }

  async filterByLevel(level: string, order: string) {
    const challenges = await Challenge.findAll({
      where: {
        level: level
      },
      include: [{
        model: User,
        attributes: ["username", "email", "score"]
      }],
      order: [
        ['createdAt', order]
      ]
    });
    return challenges;
  }

  async findByTitle(title: string) {
    const challenge = await Challenge.findAll(
      { 
        where: {
          title: {
            [Op.like]: "%" + title + "%"
          }
        },

        include: [{
          model: User,
          attributes: ["username", "email", "score"]
        }]
      }
    );

    return challenge;
  }

  async findById(id: number) {
    const challenge = await Challenge.findOne(
      { 
        where: {
          id_challenge: id
        },

        include: [{
          model: User,
          attributes: ["username", "email", "score"]
        }]
      }
    );

    return challenge;
  }

  async findByUserId(id: number) {
    const challenge = await Challenge.findAll(
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

    return challenge;
  }
}

export const challengeRepository = new ChallengeRepository();