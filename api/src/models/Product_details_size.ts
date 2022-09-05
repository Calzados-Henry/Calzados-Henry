import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Product_details_sizeI } from "../types";

@Table(
  {
    tableName: "product_details_size",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Product_details_size extends Model implements Product_details_sizeI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'product_details',
      key: 'id'
    }
  })
  id_product_details!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'sizes',
      key: 'id'
    }
  })
  id_sizes!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  stock!: number;
}