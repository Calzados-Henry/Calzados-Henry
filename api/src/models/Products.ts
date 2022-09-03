import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Gender, Season } from "../enums"

/* enum Gender {
  Male = 'Male',
  Female = 'Female',
  Unisex = 'Unisex'
}

enum Season {
  Winter = 'Winter',
  Summer = 'Summer',
  Fall = 'Fall',
  Spring = 'Spring'
} */

export interface ProductsI {
  id: number
  id_category: number
  name: string
  description: string
  gender: Gender
  season: Season
  rate_average: number
  buy_price: number
  sell_price: number
  isActive: boolean
}

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
    type: DataType.ENUM('Winter', 'Summer', 'Fall', 'Spring'),
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

// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//   // defino el modelo
//   sequelize.define('products', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     id_category: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'category',
//         key: 'id'
//       }
//     },
//     name: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     description: {
//       allowNull: false,
//       type: DataTypes.TEXT,
//     },
//     gender: {
//       allowNull: false,
//       type: DataTypes.ENUM('Male', 'Female', 'Unisex'),
//     },
//     season: {
//       allowNull: false,
//       type: DataTypes.ENUM('Winter', 'Summer', 'Fall', 'Spring'),
//     },
//     rate_average: {
//       allowNull: false,
//       type: DataTypes.DECIMAL(10, 2),
//       defaultValue: 0
//     },
//     buy_price: {
//       allowNull: false,
//       type: DataTypes.DECIMAL(10, 2),
//     },
//     sell_price: {
//       allowNull: false,
//       type: DataTypes.DECIMAL(10, 2),
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     }
//   }, { timestamps: false, freezeTableName: true });
// };
