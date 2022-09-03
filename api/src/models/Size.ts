import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface SizeI {
  id?: number
  size: string
  isActive: boolean
}

@Table(
  {
    tableName: "size",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Size extends Model implements SizeI {
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
  size!: string;

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
//   sequelize.define('size', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     size: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     }
//   }, { timestamps: false, freezeTableName: true });
// };
