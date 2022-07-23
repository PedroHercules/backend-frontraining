import { Challenge } from '../models/Challenge';

export interface ChallengeInterface {
  title: string
  description: string
  level: string
  image: string
  tools: string
  assets: string
  colors: string
  fonts: string
}

export class ChallengeRepository {
  async register( { title, description, level, image, tools, assets, colors, fonts }: ChallengeInterface ) {
    const challenge = await Challenge.create({
      title,
      description,
      level,
      image,
      tools,
      assets,
      colors,
      fonts
    });

    return challenge;
  } 

  async find(title: string) {
    const challenge = await Challenge.findOne({ 
      where: {
        title: title
      } 
    });

    return challenge;
  }
}