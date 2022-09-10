'use strict'
// se requiere el models
import { Carrousel } from '../db';

export const getCarrousel = async (): Promise<any> => {
  // TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
  var imagesCarrousel = await Carrousel.findAll({ where: { isActive: true } })
  return imagesCarrousel.length > 0 ? imagesCarrousel : { message: "There's not any images for carrousel" };
}
export const getCarrouselAll = async (): Promise<any> => {
  // TODO => Lista de todas las imagenes activas y desactivadas [Slider] (isActive=true y isActive=false)
  var imagesCarrouselAll = await Carrousel.findAll()
  return imagesCarrouselAll.length > 0 ? imagesCarrouselAll : { message: "There's not any images for carrousel" };
}
export const createCarrousel = async (value: any): Promise<any> => {
  if (Object.prototype.toString.call(value) === '[object Array]') {
    if (value[0].hasOwnProperty('image')) {
      try {
        return await Carrousel.bulkCreate(value)
      } catch (error) {
        return { message: "Please try not to type info that already exists. Verify" }
      }
    } else {
      return { message: "Please, verify the object key, e. g: [{'image':'url_image'}] || {'image':'url_image'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('image')) {
      try {
        return await Carrousel.create(value)
      } catch (error) {
        return { message: "Please try not to type info that already exists. Verify" }
      }
    } else {
      return { message: "Please, verify the object key, e. g:: [{'image':'url_image'}] || {'image':'url_image'}" }
    }
  }
}

export const updateCarrousel = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var carrouselByID = await Carrousel.findByPk(value.id)
  var carrouselDuplicate = await Carrousel.findAll({ where: { image: String(value.image) } })
  if (carrouselByID !== null) {
    if (carrouselDuplicate.length > 0) {
      return { message: `The carrousel image for, already exists` }
    }
    carrouselByID.set(value);
    await carrouselByID.save();
    return carrouselByID
  }
  return { message: `We could't find image for the id: ${value.id}.` };
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
    return { message: `The carrousel image for the id: ${id} is already deleted` };
  }
  return { message: `We could't find image for the id: ${id}.` };
}
