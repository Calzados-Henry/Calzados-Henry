/* import { Products, Users, Category, Product_details, Color, Images, Sizes } from "../db";
import { Op } from "sequelize" */
import axios from "axios"

export const getProducts = async (product: string): Promise<any> => {

  if (product) {
    const productsBeta: Array<any> = await axios.get('http://localhost:3001/products').then(data => data.data)
    const filtrados: Array<any> = productsBeta.filter(p => p.name.toLowerCase().includes(product.toLowerCase()))
   
    if (filtrados.length > 0  ) {
      const datos = filtrados
      return datos
    } 
    } else {
      throw new Error(`there's no any product for` + product)

    }
  }
