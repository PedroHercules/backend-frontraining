import { Challenge } from '../models/Challenge';
import { User } from '../models/User';

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

export class ChallengeRepository {
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

  async all() {
    const challenges = await Challenge.findAll({
      include: [{
        model: User,
        attributes: ["username", "email", "score"]
      }]
    });
    return challenges;
  }

  async find(title: string) {
    const challenge = await Challenge.findOne(
      { 
        where: {
          title: title
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