'use strict'
// se requiere el models
import { Category, Color, Images, Products, Product_details, Sizes, Users } from '../db';
import { createP_Details } from './Product_details';

export const getProducts = async (): Promise<any> => {
  // Se trae todas las imagenes para el Slider
  var products = await Products.findAll({ include: [Users, Category, { model: Product_details, include: [Color, Images, Sizes] }] })
  return products.length > 0 ? products : { message: "No hay productos para mostrar" };
}

export const createProducts = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  const nProduct: any = await Products.create(value)
  await createP_Details({ ...value.details, id_product: nProduct.id })
  // si todo esta correcto crea una nueva talla.
  return nProduct
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
