import { Model, Column, Table, DataType } from "sequelize-typescript"

export interface ReviewsI {
  id_product: number
  id_user: number
  review: string
  rate: number
  date: Date
  isActive: boolean
}

@Table(
  {
    tableName: "reviews",
    timestamps: false,
    freezeTableName: true
  }
)

export default class Reviews extends Model implements ReviewsI {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  })
  id_product!: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  })
  id_user!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  review!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    }
  })
  rate!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  date!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  isActive!: boolean;
}


//   import { DataTypes } from 'sequelize';
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize: any) => {
//   // defino el modelo
//   sequelize.define('reviews', {
//     /*  id_product: {
//          type: DataTypes.INTEGER,
//          allowNull: false,
//          references: {
//              model: 'products',
//              key: 'id'
//          }
//      },
//      id_user: {
//          type: DataTypes.INTEGER,
//          allowNull: false,
//          references: {
//              model: 'user',
//              key: 'id'
//          }
//      }, */
//     review: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     rate: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         min: 0,
//         max: 5,
//       }
//     },
//     date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//       defaultValue: DataTypes.NOW
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true
//     }
//   }, { timestamps: false, freezeTableName: true });
// };
