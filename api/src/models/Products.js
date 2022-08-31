const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM('Male', 'Female', 'Unisex'),
    },
    season: {
      allowNull: false,
      type: DataTypes.ENUM('Winter', 'Summer', 'Fall', 'Spring'),
    },
    rate_average: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    buy_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    sell_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: false, freezeTableName: true });
};
