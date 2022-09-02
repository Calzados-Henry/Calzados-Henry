import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface AddressI {
    id?: number | null
    id_user: number
    address: string
    zip_code: number
    isActive: boolean

}

@Table(
    {

        tableName: "address",
        timestamps: false,
        freezeTableName: true

    }
)

export default class Address extends Model implements AddressI {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    })
    id?: number;


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
        type: DataType.STRING,
        allowNull: false
    })
    address!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    zip_code!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    isActive!: boolean;

}