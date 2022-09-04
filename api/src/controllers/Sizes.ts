'use strict'
import { Sizes } from '../db';

export const getSize = async (): Promise<any> => {
  // Se trae todas las tallas
  var size = await Sizes.findAll()
  return size.length > 0 ? size : { message: "Sizes not found." };
}

export const createSize = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  var size: any = await Sizes.findAll({ where: { size: String(value.size) } })
  if (size.length > 0) {
    if (size[0].dataValues.size.toLowerCase() === String(value.size).toLowerCase()) {
      return { message: "La talla ya se encuentra registrada." }
    }
  }
  // si todo esta correcto crea una nueva talla.
  return await Sizes.create(value)
}

export const updateSize = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var sizeByID = await Sizes.findByPk(value.id)
  var sizeDuplicate = await Sizes.findAll({ where: { size: String(value.size) } })
  if (sizeByID !== null) {
    if (sizeDuplicate.length > 0) {
      return { message: `Talla ya existente.` }
    }
    sizeByID.set(value);
    await sizeByID.save();
    return sizeByID
  }
  return { message: `Not Found size by ID ${value.id}.` };
}

export const deleteSize = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var sizeByID: any = await Sizes.findByPk(id)
  if (sizeByID !== null) {
    if (sizeByID.isActive) {
      sizeByID.isActive = false;
      await sizeByID.save();
      return sizeByID
    }
    return { message: `La talla con ID: ${id} ya se encuentra Eliminado` };
  }
  return { message: `No se encontro la talla con ID ${id}` };
}
