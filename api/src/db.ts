require("dotenv").config()
import { Sequelize } from "sequelize-typescript"

var configSequelize = {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  timestamps: false,
  freezeTableName: true,
  models: [__dirname + "/models"],
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
}
export const sequelize = new Sequelize(String(process.env.DATABASE_URL), configSequelize)

export const {
  Product_details_size,
  Color,
  Carrousel,
  Sizes,
  Address,
  Users,
  Product_details,
  Products,
  Reviews,
  Orders,
  Images,
  Cart_details,
  Category,
  Orders_details,
} = sequelize.models

Users.hasMany(Address, { foreignKey: "id_user" })
Address.belongsTo(Users, { foreignKey: "id_user" }) //!

Color.hasMany(Product_details, { foreignKey: "id_color" })
Product_details.belongsTo(Color, { foreignKey: "id_color" })

Products.hasMany(Product_details, { as: "details", foreignKey: "id_product" })
Product_details.belongsTo(Products, { as: "details", foreignKey: "id_product" })

Orders.hasMany(Orders_details, { foreignKey: "id_order" })
Orders_details.belongsTo(Orders, { foreignKey: "id_order" })

Orders.belongsTo(Users, { foreignKey: "id_user" })
Users.hasMany(Orders, { foreignKey: "id_user" })

Products.belongsTo(Category, { foreignKey: "id_category" })
Category.hasMany(Products, { foreignKey: "id_category" })

Products.hasMany(Orders_details, { foreignKey: "id_product" })
Orders_details.belongsTo(Products, { foreignKey: "id_product" })

Cart_details.belongsTo(Sizes, { foreignKey: "id_size" })
Sizes.hasMany(Cart_details, { foreignKey: "id_size" })

Products.belongsToMany(Users, { foreignKey: "id_product", through: Reviews })
Users.belongsToMany(Products, { foreignKey: "id_user", through: Reviews })
Reviews.belongsTo(Products, { foreignKey: "id_product" })
Reviews.belongsTo(Users, { foreignKey: "id_user" })
Users.hasMany(Reviews, { foreignKey: "id_user" })
Products.hasMany(Reviews, { foreignKey: "id_product" })

Product_details.belongsToMany(Images, { foreignKey: "id_product_details", through: "product_details_image" })
Images.belongsToMany(Product_details, { foreignKey: "id_image", through: "product_details_image" })

Product_details.belongsToMany(Sizes, { foreignKey: "id_product_details", through: Product_details_size })
Sizes.belongsToMany(Product_details, { foreignKey: "id_sizes", through: Product_details_size })
Product_details_size.belongsTo(Sizes, {foreignKey: "id_sizes"})
Product_details_size.belongsTo(Product_details, {foreignKey:"id_product_details"})
Sizes.hasMany(Product_details_size, {foreignKey:"id_sizes"})
Product_details.hasMany(Product_details_size, {foreignKey:"id_product_details"})

Users.belongsToMany(Product_details, { as: "favs", foreignKey: "id_user", through: "favourite" })
Product_details.belongsToMany(Users, { as: "favs", foreignKey: "id_product_details", through: "favourite" })


Users.belongsToMany(Product_details, { as: "cart", foreignKey: "id_user", through: Cart_details })
Product_details.belongsToMany(Users, { as: "cart", foreignKey: "id_product_details", through: Cart_details })
Cart_details.belongsTo(Users, { foreignKey: 'id_user' })
Cart_details.belongsTo(Product_details, { foreignKey: 'id_product_details' })
Users.hasMany(Cart_details, { foreignKey: 'id_user' })
Product_details.hasMany(Cart_details, { foreignKey: 'id_product_details' })


/* const model: any = Users
for (let assoc of Object.keys(model.associations)) {
  for (let accessor of Object.keys(model.associations[assoc].accessors)) {
    console.log(model.name + "." + model.associations[assoc].accessors[accessor] + "()")
  }
}
 */
