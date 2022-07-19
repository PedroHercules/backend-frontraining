import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectionDB } from './database/database';

import { routesUser } from './routes/userRoute';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use('/user', routesUser);



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