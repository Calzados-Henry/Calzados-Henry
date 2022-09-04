import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface Product_details_sizeI {
  id_product_details: number
  id_sizes: number
  stock: number
}

@Table(
  {
    tableName: "product_details_size",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Product_details_size extends Model implements Product_details_sizeI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'product_details',
      key: 'id'
    }
  })
  id_product_details!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'sizes',
      key: 'id'
    }
  })
  id_sizes!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  stock!: number;
}
// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//     // defino el modelo
//     sequelize.define('product_details', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         id_product: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'products',
//                 key: 'id'
//             }
//         },
//         id_size: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'size',
//                 key: 'id'
//             }
//         },
//         id_color: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'color',
//                 key: 'id'
//             }
//         },
//         stock: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         isActive: {
//             allowNull: false,
//             type: DataTypes.BOOLEAN,
//             defaultValue: true
//         }
//     }, { timestamps: false, freezeTableName: true });
// };
