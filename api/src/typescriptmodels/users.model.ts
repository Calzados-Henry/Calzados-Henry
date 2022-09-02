import { Model, Column, Table, DataType } from "sequelize-typescript"
import { Type_user } from "../enums"
export interface UsersI {
    id?: number | null
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
    id?: number;


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