import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  AutoIncrement, 
  AllowNull, PrimaryKey, Default, HasMany } from 'sequelize-typescript';
import { Challenge } from './Challenge';

interface UserModelInterface {
  id_user: number
  username: string
  email: string
  password: string
  score: number
}

@Table({
  tableName: 'users',
  timestamps: true
})
export class User extends Model implements UserModelInterface {

  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id_user: number

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string

  @Default(0)
  @Column(DataType.INTEGER)
  score: number

  @HasMany(() => Challenge)
  challenges: Challenge[]
}
