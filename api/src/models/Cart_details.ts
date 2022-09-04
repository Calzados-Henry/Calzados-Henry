import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface Cart_detailsI {
  id_user: number
  id_product_details: number
  quantity: number
}

@Table(
  {
    tableName: "cart_details",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Cart_details extends Model implements Cart_detailsI {
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
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'product_details',
      key: 'id'
    }
  })
  id_product_details!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;
}
// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//     // defino el modelo
//     sequelize.define('cart_details', {
//         id_user: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'users',
//                 key: 'id'
//             }
//         },
//         id_product_details: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'product_details',
//                 key: 'id'
//             }
//         },
//         quantity: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         }
//     }, { timestamps: false, freezeTableName: true });
// };
