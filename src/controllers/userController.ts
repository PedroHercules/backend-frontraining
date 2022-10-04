import { userRepository, UserInterface } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { generateToken } from '../middleware/authMiddleware';
import sendEmail from '../utils/sendEmail';
import crypto from 'crypto';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserController {

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
      
      const token = await generateToken({
        id: user?.id
      });
      
      return res.status(201).json({ token, user });
    } catch (error) {
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
      
      const token = await generateToken({
        id: user.id
      });
      
      return res.status(200).json({ token, user });
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  async findById(req: Request, res: Response) {
    try{
      const id  = req.query.id;

      const user = await userRepository.findUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: "Este usuário não é cadastrado" });
      }
      return res.status(200).json({ user });
    }catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }

  async sendResetLink(req: Request, res: Response) {
    try {
      const {email} = req.body;
      const user: any = await userRepository.findUserByEmail(email);
      if(!user){
        return res.status(404).json({ message: "Este usuário não é cadastrado" });
      }
      const token = await generateToken({
        id: user?.id,
      });

      console.log(token)

      const link = `${req.protocol}://${req.hostname}:5000/user/reset_password/${token}`
      await sendEmail(
        email,
        'marcosmpff@ufpi.edu.br',
        'Redefinição de senha',
        `
          <div>Click no link para alterar a senha</div><br/>
          <div>${link}</div>
        `
      );
      return res.status(200).send({message: 'Link para resetar a senha foi gerado com sucesso!'})
    } catch (e: any) {
      console.log('teste')
      return res.status(500).json({ message: e.message })
    }
  }
  async resetPassword(req: Request, res: Response) {
    try {
      const {password} = req.body;
      const {token} = req.params;
      const securityKey= process.env.SECURITY_KEY as string;
      // const decoded = jwt.verify(token, securityKey);
      console.log(req.params.token)
      const decode:any = jwt.verify(token, securityKey);
      if (decode) {

        const hashPassword = await bcrypt.hash(password, 10);
  
        const updateUser: any = await userRepository.updatePassword(decode?.id, hashPassword);
        let user = undefined
        if (updateUser[0] >= 1){
          user = await userRepository.findUserById(decode?.id);
        }
        if (user){
          user.password = 'undefined'
        }
        return res.status(200).send({token, user: user})
      }

    } catch (e: any) {
      return res.status(500).json({ message: e.message })
    }
  }
}

export const userController = new UserController();