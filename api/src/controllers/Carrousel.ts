'use strict'
// se requiere el models
import { Carrousel } from '../db';

export const getCarrousel = async (): Promise<any> => {
  // Se trae todas las imagenes para el Slider
  var imagesCarrousel = await Carrousel.findAll()
  return imagesCarrousel.length > 0 ? imagesCarrousel : { message: "No hay imagenes para el carrousel" };
}

export const createCarrousel = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  var imagesCarrousel: any = await Carrousel.findAll({ where: { image: String(value.image) } })
  if (imagesCarrousel.length > 0) {
    if (imagesCarrousel[0].dataValues.image.toLowerCase() === String(value.image).toLowerCase()) {
      return { message: "La imagen del carrousel ya se encuentra registrada." }
    }
  }
  // si todo esta correcto crea una nueva talla.
  return await Carrousel.create(value)
}

export const updateCarrousel = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var carrouselByID = await Carrousel.findByPk(value.id)
  var carrouselDuplicate = await Carrousel.findAll({ where: { image: String(value.image) } })
  if (carrouselByID !== null) {
    if (carrouselDuplicate.length > 0) {
      return { message: `La imagen del carrousel ya existente.` }
    }
    carrouselByID.set(value);
    await carrouselByID.save();
    return carrouselByID
  }
  return { message: `No se encontro la imagen del carrousel con el ID: ${value.id}.` };
}
export const deleteCarrousel = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var carrouselByID: any = await Carrousel.findByPk(id)
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