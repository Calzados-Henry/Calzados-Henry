'use strict'
// se requiere el models
import { Images } from '../db';
import { uploadImage/* , deleteImage */ } from '../utils/cloudinary'
import fs from 'fs-extra'


export async function subirImagen(params: any) {
  const result = await uploadImage(params)
  await fs.unlink(params)
  if (result) {
    const value = {
      id: result.public_id,
      image: result.url
    }
    return value
  } else {
    return {}
  }
}

export const getImages = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var images = await Images.findAll({ where: { isActive: true } })
  return images.length > 0 ? images : { message: "There's not any images for the product." };
}

export const getImagesAll = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var images = await Images.findAll()
  return images.length > 0 ? images : { message: "There's not any images for the product." };
}

export const createImages = async (value: any, details?: any): Promise<any> => {
  if (Object.prototype.toString.call(value.files?.image) === '[object Array]') {
    if (value.files?.image[0].hasOwnProperty('tempFilePath')) {
      try {
        for (var vImage of value.files?.image) {
          console.log(details)
          await details.createImage(await subirImagen(vImage.tempFilePath))
        }
      } catch (e: any) {
        throw new Error(e);
      }
    } else {
      return { message: "Verifique si la key de los objetos sea [image]" }
    }
  } else if (Object.prototype.toString.call(value.files) === '[object Object]') {
    if (value.files.image.hasOwnProperty('tempFilePath')) {
      try {
        await details.createImage(await subirImagen(value.files.image.tempFilePath))
      } catch (e: any) {
        throw new Error(e);
      }
    } else {
      return { message: "Verifique si la key de los objetos sea [image]" }
    }
  }
}

export const updateImages = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var imagesByID = await Images.findByPk(value.id)
  var imagesDuplicate = await Images.findAll({ where: { image: String(value.image) } })
  if (imagesByID !== null) {
    if (imagesDuplicate.length > 0) {
      return { message: `The image already exists` }
    }
    imagesByID.set(value);
    await imagesByID.save();
    return imagesByID
  }
  return { message: `We couldn't find the image with ID: ${value.id}.` };
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
    return { message: `the product image with id: ${id} is already 'deleted'` };
  }
  return { message: `We couldn't find the image with ID: ${id}` };
}
