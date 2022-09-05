import { Model, Column, Table, DataType } from "sequelize-typescript"
import { ReviewsI } from "../types";

@Table(
  {
    tableName: "reviews",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Reviews extends Model implements ReviewsI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  })
  id_product!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  })
  id_user!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  review!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    }
  })
  rate!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  date!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}