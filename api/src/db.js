require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const products = require('./models/products');
const {
  DATABASE_URL
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  timestamps: false,
  freezeTableName: true,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  }
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// !CAMBIAR AQUI SI LLEGA A SER NECESARIO!
const { Products, Category, Color, Users, Reviews, Product_details, Image } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// !CAMBIAR AQUI SI LLEGA A SER NECESARIO!
// Category.hasMany(Products, { foreignKey: 'id_category'}) //! Es necesario ponerlo? 
// Products.belongsTo(Category) //! Es necesario ponerlo? 
//Recipe.belongsToMany(Diets, { foreignKey: 'id_recipe' , through: 'recipe_diets'})

Product_details.belongsToMany(Image, { foreignKey: 'id_product_details', through: "product_details_image" })
Image.belongsToMany(Product_details, { foreignKey: 'id_image', through: "product_details_image" })

Products.belongsToMany(Users, { foreignKey: 'id_product', through: Reviews })
Users.belongsToMany(Products, { foreignKey: 'id_user', through: Reviews })

Product_details.belongsToMany(Users, { foreignKey: 'id_product_detail', through: 'favourite' })
Users.belongsToMany(Product_details, { foreignKey: 'id_user', through: 'favourite' })


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
