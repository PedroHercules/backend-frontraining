import jwt, { VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UserRepository } from '../repositories/userRepository';

import { NextFunction, Request, Response } from 'express';

dotenv.config()

interface JwtPayload {
  id: number
}

export interface getUserAuthInterface extends Request {
  user: object
}

const securityKey= process.env.SECURITY_KEY as string;

const userRepository = new UserRepository();

export async function generateToken(data: object) {
  return jwt.sign(data, securityKey, { expiresIn: '364d' })
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization){
    return res.status(401).json({ message: "Token não foi informado" });
  }

  const tokenParts = authorization.split(' ');

  if (tokenParts.length !== 2){
    return res.status(401).json({ message: "Token error" });
  }

  const [scheme, token] = tokenParts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Erro no formato do token" });
  }

  jwt.verify(token, securityKey, async (error) => {
    if (error){
      return res.status(401).json({ message: "Token inválido" });
    }
    next();
  });
}

