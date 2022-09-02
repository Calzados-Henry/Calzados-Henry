import { Sequelize } from "sequelize-typescript";
require('dotenv').config();
/* const { /* DB_PASSWORD, */ /*DB_HOST } = process.env; */

const DATABASE: string = (process.env.DATABASE_URL as string);
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
/* export const sequelize = new Sequelize("db_pruebaPF", "postgres", DB_PASSWORD, {
    host: DB_HOST/* "localhost" */
    /*dialect: 'postgres',
    models: [__dirname + '/typescriptmodels']
}) */

export const sequelize = new Sequelize( DATABASE,{
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    models: [__dirname + '/typescriptmodels']
})



console.log(sequelize.models)
/*
const { Color1 } = sequelize.models

console.log(Color1)
console.log("Imprimiendo model")
console.log(sequelize.model)
 */

const { Address, Users, Cart_detail, Product_details } = sequelize.models
/* const {id, ...restOfUser} = Users */

Users.hasMany(Address, {foreignKey:'id_user'})

Product_details.belongsToMany(Users, { foreignKey: 'id_product_details', through: Cart_detail })
Users.belongsToMany(Product_details, { foreignKey: 'id_user', through: Cart_detail })


/* 
Users.hasMany(Cart_detail, {foreignKey:'id_user'})
Cart_detail.belongsTo(Users) */

/* Product_details.hasMany(Cart_detail, {foreignKey:'id_product_details'})
Cart_detail.belongsTo(Product_details)
 */


