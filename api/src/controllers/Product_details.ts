'use strict'
// se requiere el models
import { Product_details, Color, Images, Sizes } from '../db';


export const getP_Details = async (): Promise<any> => {
  // Se trae todas las imagenes para el Slider
  var p_Detail = await Product_details.findAll({ include: [Color, Images, Sizes] })
  return p_Detail.length > 0 ? p_Detail : { message: "There's no product details to show" };
}

export const createP_Details = async (value: any): Promise<any> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar una nueva talla.
  // si todo esta correcto crea una nueva talla.
  const nP_Details: any = await Product_details.create(value)
  await nP_Details.addImages(value.images);
  value.size.forEach(async (detail: any) => {
    await nP_Details.addSizes(detail.id, { through: { stock: detail.stock } });
  });
  return nP_Details
}

export const updateP_Details = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var p_DetailByID = await Product_details.findOne({
    where: {
      id_product: value.id
    }
  })
  if (p_DetailByID !== null) {
    p_DetailByID.set(value.details);
    await p_DetailByID.save();
    return p_DetailByID
  }
  return { message: `we couldn't find the product details for the id: ${value.id}.` };
}

export const deleteP_Details = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var p_DetailByID: any = await Product_details.findByPk(id)
  if (p_DetailByID !== null) {
    if (p_DetailByID.isActive) {
      p_DetailByID.isActive = false;
      await p_DetailByID.save();
      return p_DetailByID
    }
    return { message: `the product details with id: ${id} is already deleted` };
  }
  return { message: `we couldn't find the product details for the id: ${id}` };
}
