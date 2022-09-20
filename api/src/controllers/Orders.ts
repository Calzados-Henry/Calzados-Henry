"use strict"
require("dotenv").config()
// se requiere el models
import { Address, Cart_details, Orders, Orders_details, Products, Users } from "../db"
import { UsersI } from "../types"

const STRIPE_TOKEN: string = process.env.STRIPE_TOKEN as string
console.log("Stripe Token:", STRIPE_TOKEN)
const stripe = require("stripe")(STRIPE_TOKEN)

export const getOrders = async (): Promise<any> => {
  // Se trae todas las ordenes registradas incluyendo el usuario
  /* var orders = await Orders.findAll(
    {
      include: Users
    })
 */

  var orders = await Orders.findAll({
    include: [
      {
        model: Users,
      },
      {
        model: Orders_details,
      },
    ],
  })

  return orders.length > 0 ? orders : { message: "There's no any order to show" }
}

export const createOrders = async (value: any): Promise<any> => {
  // si todo esta correcto crea una orden de compra

  const { id: id_user, idStripe: id, idAddress } = value
  console.log(id)
  const user: any = await Users.findByPk(id_user)
  let address: any = await Address.findByPk(idAddress, { attributes: [["address", "address_user"]] })
  address = address?.toJSON()
  const carts = await user.getCart_details({ attributes: { exclude: ["id_user"] } })
  /* console.log(carts) */
  let orders_details: any = []
  let total_ammount = 0

  for (const cart of carts) {
    let size = await cart.getSize({ attributes: ["size"] })
    size = size.toJSON()
    const product_detail = await cart.getProduct_detail({ attributes: ["id", "id_product", "id_color"] })

    let color = await product_detail.getColor({ attributes: ["color"] })
    color = color.toJSON()
    let image = await product_detail.getImages({ attributes: ["image"], joinTableAttributes: [] })
    image = image[0].toJSON()
    let product: any = await Products.findByPk(product_detail.id_product, {
      attributes: [["id", "id_product"], "name", "gender", "season", ["sell_price", "price"]],
    })
    product = product?.toJSON()

    const order_detail = {
      ...product,
      ...image,
      ...size,
      ...color,
      quantity: cart.quantity,
    }
    total_ammount = total_ammount + order_detail.price * order_detail.quantity

    /* console.log(total_ammount) */
    orders_details.push(order_detail)
  }

  try {
    const amount = total_ammount * 100
    const stripeParam = {
      currency: "USD",
      description: "Sehos Shop Purchase",
      payment_method: id,
      confirm: true,
      amount,
    }
    console.log("Stripe Param:", stripeParam)

    const paymentIntent = await stripe.paymentIntents.create(stripeParam)
    console.log(paymentIntent)

    const order = {
      id_user,
      ...address,
      total_ammount,
      order_state: "Fulfilled",
    }
    /* console.log(order) */
    const orderCreate: any = await Orders.create(order)

    for (const orderDetail of orders_details) {
      console.log("creando detalle", await orderCreate.createOrders_detail(orderDetail))
    }

    for (const cart of carts) {
      const product_detail = await cart.getProduct_detail({ attributes: ["id", "id_product", "id_color"] })
      const product_details_size = await product_detail.getProduct_details_sizes({ where: { id_sizes: cart.id_size } })
      product_details_size[0].stock = product_details_size[0].stock - cart.quantity
      await product_details_size[0].save()
    }
    await Cart_details.destroy({ where: { id_user: id_user } })
    return { ...order, orders_details }
  } catch (error: any) {
    console.log(error)
    console.log(error.message)
    console.log(error.raw.message)
    /* const order = {
      id_user,
      ...address,
      total_ammount,
      order_state: 'Rechazado',
      orders_details
    } */

    throw new Error(error.raw.message)
  }
}

export const updateOrders = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var carrouselByID = await Orders.findByPk(value.id)
  var carrouselDuplicate = await Orders.findAll({ where: { image: String(value.image) } })
  if (carrouselByID !== null) {
    if (carrouselDuplicate.length > 0) {
      return { message: `The carrousel image already exists` }
    }
    carrouselByID.set(value)
    await carrouselByID.save()
    return carrouselByID
  }
  return { message: `We couldn't find the carrousel image for the id: ${value.id}.` }
}

export const deleteOrders = async (id: number): Promise<any> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var carrouselByID: any = await Orders.findByPk(id)
  if (carrouselByID !== null) {
    if (carrouselByID.isActive) {
      carrouselByID.isActive = false
      await carrouselByID.save()
      return carrouselByID
    }
    return { message: `the carrousel image with id: ${id} is already deleted` }
  }
  return { message: `We couldn't find the carrousel image for the id: ${id}` }
}
export const getOrdersUser = async (id_user: UsersI["id"]) => {
  try {
    let findOrdersUser = await Orders.findAll({
      include: [{ model: Orders_details }],
      where: { id_user: id_user },
    })
    if (findOrdersUser) return findOrdersUser
    else return []
  } catch (error) {
    return error
  }
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
