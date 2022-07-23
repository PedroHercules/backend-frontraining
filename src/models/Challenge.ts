import { Table, Column, Model, DataType, AutoIncrement, AllowNull, PrimaryKey, Default } from 'sequelize-typescript';

interface ChallengeModelInterface {
  id_challenge: number
  title: string
  description: string
  level: string
  image: string
  tools: string
  assets: string
  colors: string
  fonts: string
}
@Table({
  tableName: 'challenges',
  timestamps: true
})
export class Challenge extends Model implements ChallengeModelInterface {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id_challenge: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  level: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  image: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  tools: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  assets: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  colors: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fonts: string;
}