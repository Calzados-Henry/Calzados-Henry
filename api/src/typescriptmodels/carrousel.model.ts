import { Model, Column, Table, DataType } from "sequelize-typescript"


export interface CarrouselI {
    id?: number | null
    image: string
    isActive: boolean
}

@Table(
    {   
        tableName: "carrousel",
        timestamps: false,
        freezeTableName: true
    }
)

export default class Carrousel extends Model implements CarrouselI {

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
        unique: true
    })
    image!: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    isActive!: boolean;

}