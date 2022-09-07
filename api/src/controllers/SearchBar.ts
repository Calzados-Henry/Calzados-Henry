import { Products, Users, Category, Product_details, Color, Images, Sizes } from "../db";
import { Op } from "sequelize"

export const getProducts = async (product: string): Promise<any> => {
    if (product) {
        const productos = await Products.findAll({
            where: {
                name:{
                        [Op.iLike]: '%'+product+'%'}
            },
            include: [Users, Category, { model: Product_details, include: [Color, Images, Sizes] }] 
        })
        if (productos.length > 0)
            return productos
        else {
            throw new Error('No se encontraron productos para ' + product)
        }
    } else {
        throw new Error('Por favor ingrese el nombre del producto a buscar')
    }
}