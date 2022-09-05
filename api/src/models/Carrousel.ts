import { Model, Column, Table, DataType } from "sequelize-typescript"
import { CarrouselI } from "../types";

@Table(
  {
    tableName: "carrousel",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Carrousel extends Model implements CarrouselI {
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
  image!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}