import { Table, Column, Model, DataType, AutoIncrement, AllowNull, PrimaryKey, DefaultScope } from 'sequelize-typescript';
import { connectionDB } from '../database/database';


interface UserModelInterface {
  id: number
  username: string
  email: string
  password: string
}

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
