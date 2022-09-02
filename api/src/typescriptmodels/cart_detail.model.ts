import { Model, Column, Table, DataType } from "sequelize-typescript"


export interface Cart_detailI {
    id_user?: number
    id_product_details: number
    quantity: number
}

@Table(
    {
        tableName: "cart_detail",
        timestamps: false,
        freezeTableName: true
    }
)

export default class Cart_detail extends Model implements Cart_detailI {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    })
    id_user?: number;


    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'product_details',
            key: 'id'
        }
    })
    id_product_details!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    quantity!: number;

}