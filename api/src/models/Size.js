const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('size', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, { timestamps: false, freezeTableName: true });
};
