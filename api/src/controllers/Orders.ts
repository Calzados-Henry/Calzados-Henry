'use strict'
// se requiere el models
import { Orders, Orders_details, Users } from '../db';


export const getOrders = async (): Promise<any> => {
  // Se trae todas las ordenes registradas incluyendo el usuario
  /* var orders = await Orders.findAll(
    {
      include: Users
    })
 */

  var orders = await Orders.findAll(
    {
      include: [
        {
          model: Users
        },
        {
          model: Orders_details
        }
      ]
    })

  return orders.length > 0 ? orders : { message: "No hay ordenes para mostrar" };
}

export const createOrders = async (value: any): Promise<any> => {
  // si todo esta correcto crea una orden de compra

  const { orders_details, ...restOfOrder } = value
  const createdOrder: any = await Orders.create(restOfOrder)
  for (const order_detail of orders_details) {
    await createdOrder.createOrders_detail(order_detail)
  }

  return await Orders.findByPk(createdOrder.id, {
    include: {
      model: Orders_details
    }
  })
}

export const updateOrders = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var carrouselByID = await Orders.findByPk(value.id)
  var carrouselDuplicate = await Orders.findAll({ where: { image: String(value.image) } })
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

export const deleteOrders = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var carrouselByID: any = await Orders.findByPk(id)
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

// module.exports = {
//   getOrders: async (): Promise<any> => {
//     // Se trae todas las ordenes registradas incluyendo el usuario
//     var orders = await nOrders.Orders.findAll({ include: nUsers.Users })
//     return orders.length > 0 ? orders : { message: "No hay ordenes para mostrar" };
//   },

//   createOrders: async (value: any): Promise<any> => {
//     // si todo esta correcto crea una orden de compra
//     return await nOrders.Orders.create(value)
//   },

//   updateOrders: async (value: any): Promise<any> => {
//     // Se busca el usuario por id
//     var carrouselByID = await nOrders.Orders.findByPk(value.id)
//     var carrouselDuplicate = await nOrders.Orders.findAll({ where: { image: String(value.image) } })
//     if (carrouselByID !== null) {
//       if (carrouselDuplicate.length > 0) {
//         return { message: `La imagen del carrousel ya existente.` }
//       }
//       carrouselByID.set(value);
//       await carrouselByID.save();
//       return carrouselByID
//     }
//     return { message: `No se encontro la imagen del carrousel con el ID: ${value.id}.` };
//   },
//   deleteOrders: async (id: number): Promise<any> => {
//     // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
//     var carrouselByID = await nOrders.Orders.findByPk(id)
//     if (carrouselByID !== null) {
//       if (carrouselByID.isActive) {
//         carrouselByID.isActive = false;
//         await carrouselByID.save();
//         return carrouselByID
//       }
//       return { message: `La imagen del carrousel con el ID: ${id} ya se encuentra Eliminado` };
//     }
//     return { message: `No se encontro la imagen del carrousel con ID ${id}` };
//   }
// }