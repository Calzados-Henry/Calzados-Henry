'use strict'
// se requiere el models
const mProducts = require('../../db');
const mCategory = require('../../db');
module.exports = {
  getProducts: async (): Promise<any> => {
    // Se trae todas las imagenes para el Slider
    var products = await mProducts.Products.findAll({ include: 'category' })
    return products.length > 0 ? products : { message: "No hay productos para mostrar" };
  },

  createProducts: async (value: any): Promise<any> => {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.

    // si todo esta correcto crea una nueva talla.
    return await mProducts.Products.create(value)
  },

  updateProducts: async (value: any): Promise<any> => {
    // Se busca el usuario por id
    var productByID = await mProducts.Products.findByPk(value.id)
    if (productByID !== null) {
      productByID.set(value);
      await productByID.save();
      return productByID
    }
    return { message: `No se encontro el producto con el ID: ${value.id}.` };
  },

  deleteProducts: async (id: number): Promise<any> => {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var productByID = await mProducts.Products.findByPk(id)
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
}