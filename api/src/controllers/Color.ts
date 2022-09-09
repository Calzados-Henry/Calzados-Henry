'use strict'
// se requiere el models
import { Color } from '../db';

export const getColor = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var color = await Color.findAll({ where: { isActive: true } })
  return color.length > 0 ? color : { message: "there aren't any colors registered" };
}
export const getColorAll = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var color = await Color.findAll()
  return color.length > 0 ? color : { message: "No hay colores registrados." };
}
export const createColor = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  if (Object.prototype.toString.call(value) === '[object Array]') {
    if (value[0].hasOwnProperty('color')) {
      try {
        return await Color.bulkCreate(value)
      } catch (error) {
        return { message: "Please check if there's no repeated color" }
      }
    } else {
      return { message: "Please, verify the object key, e. g: [{'color':'color'}] || {'color':'color'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('color')) {
      try {
        return await Color.create(value)
      } catch (error) {
        return { message: "Please verify if that color is not already created" }
      }
    } else {
      return { message: "Please, verify the object key, e. g: [{'color':'color'}] || {'color':'color'}" }
    }
  }
}

export const updateColor = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var colorByID = await Color.findByPk(value.id)
  var colorDuplicate = await Color.findAll({ where: { color: String(value.color) } })
  if (colorByID !== null) {
    if (colorDuplicate.length > 0) {
      return { message: `The color already exists.` }
    }
    colorByID.set(value);
    await colorByID.save();
    return colorByID
  }
  return { message: `We couldn't find the color with ID: ${value.id}.` };
}
export const deleteColor = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var colorByID: any = await Color.findByPk(id)
  if (colorByID !== null) {
    if (colorByID.isActive) {
      colorByID.isActive = false;
      await colorByID.save();
      return colorByID
    }
    return { message: `The color with id ${id} is already deleted` };
  }
  return { message: `We couldn't find the color with ID: ${id}` };
}
