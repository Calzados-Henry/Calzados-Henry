import { Model, Column, Table, DataType } from "sequelize-typescript"
import { ColorI } from "../types";

@Table(
  {
    tableName: "color",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Color extends Model implements ColorI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  color!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}