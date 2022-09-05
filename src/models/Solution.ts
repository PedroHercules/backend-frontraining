import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  AutoIncrement, 
  AllowNull, PrimaryKey, BelongsTo, ForeignKey} from 'sequelize-typescript';

import { Challenge } from './Challenge'
import { User } from './User';

interface SolutionInterface {
  id_solution: number
  challengeId: number
  userId: number
  title: string
  repository: string
  site: string
  image: string
}

@Table({
  tableName: 'solutions',
  timestamps: true
})
export class Solution extends Model implements SolutionInterface {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id_solution: number;

  @AllowNull(false)
  @ForeignKey(() => Challenge)
  @Column(DataType.INTEGER)
  challengeId: number;

  @BelongsTo(() => Challenge, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true
  })
  challenge: Challenge

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  repository: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  site: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  image: string;
}