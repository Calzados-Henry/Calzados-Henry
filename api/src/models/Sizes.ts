import { Model, Column, Table, DataType } from "sequelize-typescript"
import { SizeI } from "../types";

@Table(
  {
    tableName: "sizes",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Sizes extends Model implements SizeI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  size!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}