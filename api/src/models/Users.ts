import { Model, Column, Table, DataType } from "sequelize-typescript"
// import { Type_user } from "./ENUMS"

enum Type_user {
  Administrator = 'Administrator',
  Employee = 'Employee',
  User = "User"
}

export interface UsersI {
  id: number
  username: string
  password: string
  email: string
  name: string
  last_name: string
  phone: string
  identification: number
  type_user: Type_user
  isActive: boolean
}

@Table(
  {
    tableName: "users",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Users extends Model implements UsersI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  identification!: number;

  @Column({
    type: DataType.ENUM('Administrator', 'Employee', 'User'),
    allowNull: false,
  })
  type_user!: Type_user;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}

// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//   // defino el modelo
//   sequelize.define('users', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     identification: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//     type_user: {
//       type: DataTypes.ENUM('Administrator', 'Employee', 'User'),
//       allowNull: false,
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     }
//   }, { timestamps: false, freezeTableName: true });
// };
