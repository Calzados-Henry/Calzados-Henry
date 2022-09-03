'use strict'
// se requiere el models
import { Products, Category } from '../db';


export const getProducts = async (): Promise<any> => {
  // Se trae todas las imagenes para el Slider
  var products = await Products.findAll({ include: Category })
  return products.length > 0 ? products : { message: "No hay productos para mostrar" };
}

export const createProducts = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.

  // si todo esta correcto crea una nueva talla.
  return await Products.create(value)
}

export const updateProducts = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var productByID = await Products.findByPk(value.id)
  if (productByID !== null) {
    productByID.set(value);
    await productByID.save();
    return productByID
  }
  return { message: `No se encontro el producto con el ID: ${value.id}.` };
}

export const deleteProducts = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var productByID: any = await Products.findByPk(id)
  if (productByID !== null) {
    if (productByID.isActive) {
      productByID.isActive = false;
      await productByID.save();
      return productByID
    }
    return { message: `El producto con el ID: ${id} ya se encuentra Eliminado` };
  }
  return { message: `No se encontro el producto con el ID ${id}` };
}
