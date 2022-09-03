import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface OrdersI {
  id: number
  id_user: number
  purchase_date: Date
  address_user: string
  total_ammount: number
  order_state: string
  isActive: boolean
}

@Table(
  {
    tableName: "orders",
    timestamps: false,
    freezeTableName: true
  }
)


export default class Orders extends Model implements OrdersI {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  })
  id!: number;

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
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  purchase_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address_user!: string

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  total_ammount!: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  order_state!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean
}
// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.

// module.exports = (sequelize: any) => {
//     // defino el modelo
//     sequelize.define('orders', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         id_user: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'users',
//                 key: 'id',
//             }
//         },
//         purchase_date: {
//             type: DataTypes.DATEONLY,
//             allowNull: false,
//             defaultValue: DataTypes.NOW
//         },
//         address_user: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         total_ammount: {
//             type: DataTypes.DECIMAL(10, 2),
//             allowNull: false,
//         },
//         order_state: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         isActive: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: true
//         },
//     },
//         { timestamps: false, freezeTableName: true });
// };