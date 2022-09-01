import { DataTypes } from 'sequelize';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize: any) => {
    // defino el modelo
    sequelize.define('reviews', {
        /*  id_product: {
             type: DataTypes.INTEGER,
             allowNull: false,
             references: {
                 model: 'products',
                 key: 'id'
             }
         },
         id_user: {
             type: DataTypes.INTEGER,
             allowNull: false,
             references: {
                 model: 'user',
                 key: 'id'
             }
         }, */
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, { timestamps: false, freezeTableName: true });
};
