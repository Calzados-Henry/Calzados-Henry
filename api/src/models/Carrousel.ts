import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface CarrouselI {
  id?: number
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
//   sequelize.define('carrousel', {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true
//     },
//     image: {
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
