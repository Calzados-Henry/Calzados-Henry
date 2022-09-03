import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface Product_detailsI {
  id?: number
  id_product?: number
  id_size?: number
  id_color?: number
  stock: number
  isActive: boolean
}

@Table(
  {
    tableName: "product_details",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Product_details extends Model implements Product_detailsI {
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
      model: 'products',
      key: 'id'
    }
  })
  id_product?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'size',
      key: 'id'
    }
  })
  id_size?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'color',
      key: 'id'
    }
  })
  id_color?: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  stock!: number

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
