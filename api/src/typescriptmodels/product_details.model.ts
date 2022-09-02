import { Model, Column, Table, DataType } from "sequelize-typescript"


export interface Product_detailsI {
  id?: number
  id_product: number
  id_size: number
  id_color: number
  stock: number
  isActive: boolean
}

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
  id?: number;


  /* @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  }) */
  id_product!: number;

 /*  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'size',
      key: 'id'
    }
  }) */
  id_size!: number;

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
    type: DataType.INTEGER,
    allowNull: false
  })
  stock!: number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean
}