import { Sequelize, Op, Model } from 'sequelize';
import { User  } from '../models/User';

export interface UserInterface {
  id?: number
  username: string,
  email: string,
  password?: string
}

class UserRepository {

  async createUser({ username, email, password }: UserInterface) {
    const user: UserInterface = await User.create({ 
        username,
        email,
        password
      }
    );

    user.password = undefined;
    return user;
  }

  async findUser(username: string, email: string) {
    const user = await User.findOne({
      raw: true,
      where: {
        [Op.or]: [
          {username: username},
          {email: email}
        ]
      }
    });
    return user;
  }

  async findUserByEmail (email: string) {
    const user = await User.findOne({
      raw: true,
      where: {
        email: email
      }
    });

    return user;
  }
}

export const userRepository = new UserRepository();
