import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const userRepository = new UserRepository();
export class UserController {

  async registerUser (req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Todos os campos são obrigatórios"
        });
      }

      const checkUserExist = await userRepository.findUser(username, email);
     
      if (checkUserExist?.username === username) {
        return res.status(400).json({ message: "Nome de usuário já existe!" });
      }

      if (checkUserExist?.email === email) {
        return res.status(400).json({ message: "E-mail já existe!" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      
      const user = await userRepository.createUser({
        username,
        email,
        password: hashPassword
      });
      
      return res.status(201).json({ user });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: error
      });
    }
  }
}