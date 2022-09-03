import { Model, Column, Table, DataType } from "sequelize-typescript";

export interface AddressI {
  id?: number
  id_user?: number
  address: string
  zip_code: number
  isActive: boolean
}

@Table(
  {
    tableName: 'address',
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
  id_user?: number;

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

// import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//   // defino el modelo
//   sequelize.define('address', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     id_user: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'users',
//         key: 'id'
//       }
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     zip_code: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     }
//   }, { timestamps: false, freezeTableName: true });
// };
