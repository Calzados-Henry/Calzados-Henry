import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize: any) => {
    // defino el modelo
    sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            }
        },
        purchase_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        address_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_ammount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        order_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    },
        { timestamps: false, freezeTableName: true });
};