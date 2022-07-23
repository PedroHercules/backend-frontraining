import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

import { User } from '../models/User';
import { Challenge } from '../models/Challenge';

dotenv.config();

const db_host = process.env.DB_HOST!;
const db_name = process.env.DB_NAME!;
const db_user = process.env.DB_USER!;
const db_pass = process.env.DB_PASS!;
const db_dialect = process.env.DB_DIALECT! as Dialect;

export const connectionDB = new Sequelize(db_name, db_user, db_pass, {
  host: db_host,
  dialect: db_dialect
});

connectionDB.addModels([User, Challenge]);

