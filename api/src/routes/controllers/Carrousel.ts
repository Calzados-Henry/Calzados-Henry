'use strict'
// se requiere el models
const Carrousel = require('../../db');

module.exports = {
  getCarrousel: async (): Promise<any> => {
    // Se trae todas las imagenes para el Slider
    var imagesCarrousel = await Carrousel.Carrousel.findAll()
    return imagesCarrousel.length > 0 ? imagesCarrousel : { message: "No hay imagenes para el carrousel" };
  },

  createCarrousel: async (value: any): Promise<any> => {
    // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
    var imagesCarrousel = await Carrousel.Carrousel.findAll({ where: { image: String(value.image) } })
    if (imagesCarrousel.length > 0) {
      if (imagesCarrousel[0].dataValues.image.toLowerCase() === String(value.image).toLowerCase()) {
        return { message: "La imagen del carrousel ya se encuentra registrada." }
      }
    }
    // si todo esta correcto crea una nueva talla.
    return await Carrousel.Carrousel.create(value)
  },

  updateCarrousel: async (value: any): Promise<any> => {
    // Se busca el usuario por id
    var carrouselByID = await Carrousel.Carrousel.findByPk(value.id)
    var carrouselDuplicate = await Carrousel.Carrousel.findAll({ where: { image: String(value.image) } })
    if (carrouselByID !== null) {
      if (carrouselDuplicate.length > 0) {
        return { message: `La imagen del carrousel ya existente.` }
      }
      carrouselByID.set(value);
      await carrouselByID.save();
      return carrouselByID
    }
    return { message: `No se encontro la imagen del carrousel con el ID: ${value.id}.` };
  },
  deleteCarrousel: async (id: number): Promise<any> => {
    // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
    var carrouselByID = await Carrousel.Carrousel.findByPk(id)
    if (carrouselByID !== null) {
      if (carrouselByID.isActive) {
        carrouselByID.isActive = false;
        await carrouselByID.save();
        return carrouselByID
      }
      return { message: `La imagen del carrousel con el ID: ${id} ya se encuentra Eliminado` };
    }
    return { message: `No se encontro la imagen del carrousel con ID ${id}` };
  }
}