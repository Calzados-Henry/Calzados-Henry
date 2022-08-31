const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('product_details', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        id_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'size',
                key: 'id'
            }
        },
        id_color: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'color',
                key: 'id'
            }
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { timestamps: false, freezeTableName: true });
};
