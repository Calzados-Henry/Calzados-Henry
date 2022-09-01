import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: any) => {
    // defino el modelo
    sequelize.define('cart_details', {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        id_product_details: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'product_details',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, { timestamps: false, freezeTableName: true });
};
