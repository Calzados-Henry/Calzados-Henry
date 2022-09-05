import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Product_detailsI } from "../types";

@Table(
  {
    tableName: "product_details",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Product_details extends Model implements Product_detailsI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  })
  id_product!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'color',
      key: 'id'
    }
  })
  id_color!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean
}