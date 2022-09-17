import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Gender, Season } from "../enum";
import { Orders_detailsI } from "../types";

@Table(
  {
    tableName: "orders_details",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Orders_details extends Model implements Orders_detailsI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  })
  id_order!: number;

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
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  image!: string

  @Column({
    type: DataType.ENUM('Male', 'Female', 'Unisex'),
    allowNull: false
  })
  gender!: Gender

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  size!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  color!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number

  @Column({
    type: DataType.ENUM('Winter', 'Summer', 'Fall', 'Spring'),
    allowNull: false
  })
  season!: Season

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number
}