import { Model, Column, Table, DataType } from "sequelize-typescript"
import { TypeUser } from "../enum"
import { UsersI } from "../types";

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
    type: DataType.DATEONLY,
    allowNull: false,
  })
  birth_date!: Date;

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
    type: DataType.ENUM('Administrator', 'Employee', 'User', 'Google'),
    allowNull: false,
    defaultValue: 'User'
  })
  type_user!: TypeUser;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}