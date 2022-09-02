import { Model, Column, Table, DataType } from "sequelize-typescript"


export interface ColorI {
    id?: number | null
    color: string
    isActive: boolean
}

@Table(
    {
        
        tableName: "color3",
        timestamps: false,
        freezeTableName: true
        

    }
)

export default class Color1 extends Model implements ColorI {

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
    color!: string;

    @Column({
        allowNull: false,
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    isActive!: boolean;

}