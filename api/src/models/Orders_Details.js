const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('order_details',{
        id_order:{
            type:DataTypes.INTEGER,
            allowNull:false, 
            references:{
                model:'orders',
                key:'id'
            }
        },
        id_product:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        image:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        gender:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        size:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        color:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        quantity:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        season:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    });
}