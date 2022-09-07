import { Products } from "../db";
import { Op } from "sequelize"

export const getProducts = async (product: string): Promise<any> => {
    if (product) {
        const productos = await Products.findAll({
            where: {
                name:{
                        [Op.iLike]: '%'+product+'%'}
            }
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