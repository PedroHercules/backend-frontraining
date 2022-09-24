import { Sequelize, Op, Model } from 'sequelize';
import { User  } from '../models/User';

export interface UserInterface{
  id_user?: number;
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

    const userLog = await this.findUserById(user?.id_user || 1);
    if (userLog) {
      userLog.password = 'undefined';
    }
    return userLog;
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
  async findUserById (id: Number) {
    const user = await User.findOne({
      raw: true,
      where: {
        id_user: id
      }
    });

    return user;
  }
  async updateScore(id: number, level: number){
    const user = await User.findOne({
      where: {
        id_user: id
      }
    });

    user?.increment('score', {by: (10 * level)})
    return user;
  }
}

export const userRepository = new UserRepository();
