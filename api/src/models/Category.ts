import { Model, Column, Table, DataType } from "sequelize-typescript"
import { CategoryI } from "../types";

@Table(
  {
    tableName: "category",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Category extends Model implements CategoryI {
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
  category!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}