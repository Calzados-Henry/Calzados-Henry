import { Model, Column, Table, DataType } from "sequelize-typescript"
// import { Season, Gender } from "./ENUMS"

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex'
}

enum Season {
  Winter = 'Winter',
  Summer = 'Summer',
  Fall = 'Fall',
  Spring = 'Spring'
}

export interface Orders_detailsI {
  id_order: number
  id_product: number
  name: string
  image: string
  gender: Gender
  size: string
  color: string
  quantity: number
  season: Season
  price: number
}

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
    allowNull: false
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

// import { DataTypes } from 'sequelize';

// module.exports = (sequelize: any) => {
//   sequelize.define('orders_details', {
//     id_order: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'orders',
//         key: 'id'
//       }
//     },
//     id_product: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     gender: {
//       type: DataTypes.ENUM('Male', 'Female', 'Unisex'),
//       allowNull: false,
//     },
//     size: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     color: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     season: {
//       type: DataTypes.ENUM('Winter', 'Summer', 'Fall', 'Spring'),
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     }
//   }, { timestamps: false, freezeTableName: true });
// }