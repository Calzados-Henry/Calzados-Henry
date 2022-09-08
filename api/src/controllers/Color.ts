'use strict'
// se requiere el models
import { Color } from '../db';

export const getColor = async (): Promise<any> => {
  // Se trae todas las imagenes para los productos
  var color = await Color.findAll({ where: { isActive: true } })
  return color.length > 0 ? color : { message: "No hay colores registrados." };
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
        return { message: "No intente ingresar datos existente, verifique porfavor." }
      }
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'color':'color'}] || {'color':'color'}" }
    }
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    if (value.hasOwnProperty('color')) {
      try {
        return await Color.create(value)
      } catch (error) {
        return { message: "No intente ingresar datos existente, verifique porfavor." }
      }
    } else {
      return { message: "Verifique si la key del objeto, ejemplo: [{'color':'color'}] || {'color':'color'}" }
    }
  }
}

export const updateColor = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var colorByID = await Color.findByPk(value.id)
  var colorDuplicate = await Color.findAll({ where: { color: String(value.color) } })
  if (colorByID !== null) {
    if (colorDuplicate.length > 0) {
      return { message: `El color ya existe.` }
    }
    colorByID.set(value);
    await colorByID.save();
    return colorByID
  }
  return { message: `No se encontro el color con el ID: ${value.id}.` };
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
    return { message: `El color con el ID: ${id} ya se encuentra Eliminado` };
  }
  return { message: `No se encontro el color con el ID: ${id}` };
}
