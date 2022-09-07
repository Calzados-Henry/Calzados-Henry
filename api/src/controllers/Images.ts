'use strict'
// se requiere el models
import { Images } from '../db';

export const getImages = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var images = await Images.findAll({ where: { isActive: true } })
  return images.length > 0 ? images : { message: "No hay imagenes para el producto." };
}

export const getImagesAll = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var images = await Images.findAll()
  return images.length > 0 ? images : { message: "No hay imagenes para el producto." };
}

export const createImages = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  if (Object.prototype.toString.call(value) === '[object Array]') {
    if (value[0].hasOwnProperty('image')) {
      try {
        return await Images.bulkCreate(value)
      } catch (error) {
        return { message: "No intente ingresar datos existente, verifique porfavor." }
      }
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'image':'link_image'}] || {'image':'link_image'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('image')) {
      try {
        return await Images.create(value)
      } catch (error) {
        return { message: "No intente ingresar datos existente, verifique porfavor." }
      }
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'image':'link_image'}] || {'image':'link_image'}" }
    }
  }
}

export const updateImages = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var imagesByID = await Images.findByPk(value.id)
  var imagesDuplicate = await Images.findAll({ where: { image: String(value.image) } })
  if (imagesByID !== null) {
    if (imagesDuplicate.length > 0) {
      return { message: `La imagen del producto ya existe.` }
    }
    imagesByID.set(value);
    await imagesByID.save();
    return imagesByID
  }
  return { message: `No se encontro la imagen del producto con el ID: ${value.id}.` };
}
export const deleteImages = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var imagesByID: any = await Images.findByPk(id)
  if (imagesByID !== null) {
    if (imagesByID.isActive) {
      imagesByID.isActive = false;
      await imagesByID.save();
      return imagesByID
    }
    return { message: `La imagen del producto con el ID: ${id} ya se encuentra Eliminado` };
  }
  return { message: `No se encontro la imagen del producto con ID ${id}` };
}
