import { Model, Column, Table, DataType } from "sequelize-typescript"
import { ImagesI } from "../types";

@Table(
  {
    tableName: "images",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Images extends Model implements ImagesI {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  image!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}