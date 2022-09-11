import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Gender, Season } from "../enum";
import { ProductsI } from "../types";

@Table(
  {
    tableName: "products",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Products extends Model implements ProductsI {
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
      model: 'category',
      key: 'id'
    }
  })
  id_category!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.ENUM('Male', 'Female', 'Unisex'),
    allowNull: false
  })
  gender!: Gender

  @Column({
    type: DataType.ENUM('Winter', 'Summer', 'Autumn', 'Spring'),
    allowNull: false
  })
  season!: Season

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  })
  rate_average!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  buy_price!: number

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  sell_price!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean
}