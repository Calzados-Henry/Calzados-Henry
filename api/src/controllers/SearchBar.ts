import { Products, Users, Category, Product_details, Color, Images, Sizes } from "../db";
import { Op } from "sequelize"
import axios from "axios"

export const getProducts = async (product: string): Promise<any> => {

    if (product) {
        const productsBeta: Array<any> = await axios.get('http://localhost:3001/prueba').then(data=>data.data)
        const filtrados:Array<any> = productsBeta.filter(p=>p.name.toLowerCase().includes(product.toLowerCase()))
        const productos: Array<string | number | object> = await Products.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + product + '%'
                }
            },
            include: [Users, Category, { model: Product_details, include: [Color, Images, Sizes] }]
        })
        if (productos.length > 0 && filtrados) {
            const datos = productos.concat(filtrados)
            return datos
        } else if (filtrados) {
            return filtrados
        } else {
            throw new Error('No se encontraron productos para ' + product)

        }
    } else {
        throw new Error('Por favor ingrese el nombre del producto a buscar')
    }
}