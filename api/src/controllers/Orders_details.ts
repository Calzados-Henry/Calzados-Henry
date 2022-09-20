import { Orders_detailsI } from "../types"
import { Orders, Orders_details } from "../db"

export const getOrders_details = async (): Promise<Orders_detailsI> => {
  const orders_details: any = await Orders_details.findAll()
  if (!orders_details.length) {
    throw new Error("No existen order_Details")
  }
  return orders_details
}

export const getOrderDetail = async (id: Orders_detailsI["id_order"]) => {
  try {
    const orders_details: any = await Orders_details.findAll({
      include: [{ model: Orders, attributes: ["total_ammount"] }],
      where: {
        id_order: id,
      },
    })
    return orders_details
  } catch (error) {
    return error
  }
}

export const createOrder_detail = async (order_details: any): Promise<Orders_detailsI> => {
  const result: any = await Orders_details.create(order_details)
  return result
}

export const toNewOrder_Detail = (object: any): Orders_detailsI => {
  const newOrders_details: Orders_detailsI = {
    id_order: object.id_order,
    id_product: object.id_product,
    name: object.name,
    image: object.image,
    gender: object.gender,
    size: object.size,
    color: object.color,
    quantity: object.quantity,
    season: object.season,
    price: object.price,
  }
  return newOrders_details
}

/* export const toUpdateOrder_Detail = (object: any): Orders_detailsI => {
 return null
} */

export const updateOrder_Detail = async (object: any): Promise<Orders_detailsI> => {
  const order_Detail: any = await Orders_details.findByPk(object.id)
  if (order_Detail !== null) {
    order_Detail.set(object)
    await order_Detail.save()
    return order_Detail
  }
  throw new Error(`We couldn't find the order detail with the id:${object.id}.`)
}
// El order_Detail nunca se eliminar de la base de datos

/* export const deleteOrder_Detail =  async (id: number): Promise<Orders_detailsI> => {
  const order_Detail: any = await Orders_details.findByPk(id)
  if (order_Detail !== null){
    if(order_Detail.isActive){
      order_Detail.isActive = false
      await order_Detail.save();
      return order_Detail
    }
    throw new Error(`El order:${id}.`)
  }
  throw new Error(`No se encontro el order_detail con el ID:${id}.`)
} */
