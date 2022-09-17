import { Model, Column, Table, DataType } from "sequelize-typescript"
import { CartDetailsI } from "../types";

@Table(
  {
    tableName: "cart_details",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Cart_details extends Model implements CartDetailsI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  })
  id_user!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'product_details',
      key: 'id'
    }
  })
  id_product_details!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'sizes',
      key: 'id'
    }
  })
  id_size!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}