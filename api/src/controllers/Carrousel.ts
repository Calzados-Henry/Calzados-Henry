'use strict'
// se requiere el models
import { Carrousel } from '../db';

export const getCarrousel = async (): Promise<any> => {
  // TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
  var imagesCarrousel: Array<object> = await Carrousel.findAll({ where: { isActive: true } })
  imagesCarrousel = JSON.parse(JSON.stringify(imagesCarrousel, null, 2))
  console.log(imagesCarrousel)
  return imagesCarrousel.length > 0 ? imagesCarrousel : { message: "No hay imagenes para el carrousel" };
}
export const getCarrouselAll = async (): Promise<any> => {
  // TODO => Lista de todas las imagenes activas y desactivadas [Slider] (isActive=true y isActive=false)
  var imagesCarrouselAll = await Carrousel.findAll()
  imagesCarrouselAll = JSON.parse(JSON.stringify(imagesCarrouselAll, null, 2))
  return imagesCarrouselAll.length > 0 ? imagesCarrouselAll : { message: "No hay imagenes para el carrousel" };
}
export const createCarrousel = async (value: any): Promise<any> => {

  if (Object.prototype.toString.call(value) === '[object Array]') {
    if (value[0].hasOwnProperty('image')) {
      return await Carrousel.bulkCreate(value)
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'image':'url_image'}] || {'image':'url_image'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('image')) {
      return await Carrousel.create(value)
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'image':'url_image'}] || {'image':'url_image'}" }
    }
  }
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
