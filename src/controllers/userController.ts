import { UserRepository, UserInterface } from '../repositories/userRepository';
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

  async auth (req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
      }

      const user = await userRepository.findUserByEmail(email) as UserInterface;

      if (!user) {
        return res.status(404).json({ message: "Este usuário não é cadastrado" });
      }
      
      const checkPassword = await bcrypt.compare(password, user.password!);

      if (!checkPassword){
        return res.status(400).json({ message: "Senha incorreta" });
      }

      user.password = undefined;
      
      return res.status(200).json({ user });
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}