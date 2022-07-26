import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectionDB } from './database/database';

import { routesUser } from './routes/userRoute';
import { routesChallenge } from './routes/challengeRoute';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" })
});

app.use('/user', routesUser);
app.use('/challenge', routesChallenge);



app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port} `);
  await connectionDB.authenticate();
  console.log('Database connected')
  try {
    await connectionDB.sync({ force: false });
  } catch (error: any) {
    console.log(error.message)
  }
})