import { Sequelize } from "sequelize-typescript";
/* const { DB_PASSWORD, DB_HOST } = process.env; */
/* var configSequelize = {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    timestamps: false,
    freezeTableName: true,
    // dialectOptions: {
    //   ssl: {
    //     require: true, // This will help you. But you will see nwe error
    //     rejectUnauthorized: false // This line will fix new error
    //   }
    // }
  } */
export const sequelize = new Sequelize("db_pruebaPF", "postgres", "root", {
    host: "localhost",
    dialect: 'postgres',
    models:[__dirname + '/typescriptmodels']
})

console.log(sequelize.models)

const {Color1} = sequelize.models

console.log(Color1)