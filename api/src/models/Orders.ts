import { Model, Column, Table, DataType } from "sequelize-typescript"
import { OrderState } from "../enum";
import { OrdersI } from "../types";

@Table(
  {
    tableName: "orders",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Orders extends Model implements OrdersI {
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
      model: 'users',
      key: 'id'
    }
  })
  id_user!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  purchase_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address_user!: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  total_ammount!: number

  @Column({
    type: DataType.ENUM('Pending','Fulfilled'),
    allowNull: false
  })
  order_state!: OrderState

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean
}