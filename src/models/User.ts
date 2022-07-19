import { Table, Column, Model, DataType, AutoIncrement, AllowNull, PrimaryKey, DefaultScope } from 'sequelize-typescript';
import { connectionDB } from '../database/database';


interface UserModelInterface {
  id: number
  username: string
  email: string
  password: string
}

@DefaultScope(() => ({
  attributes: ['id', 'username', 'email', 'updatedAt', 'createdAt']
}))

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model implements UserModelInterface{

  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string
}

/* export const UserModel = connectionDB.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

UserModel.sync({force: false}); */