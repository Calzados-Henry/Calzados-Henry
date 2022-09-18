'use strict'
// se requiere el models
import { Orders, Orders_details, Products, Users } from '../db';


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

  return orders.length > 0 ? orders : { message: "There's no any order to show" };
}

export const createOrders = async (value: any): Promise<any> => {
  // si todo esta correcto crea una orden de compra

  const { id_user } = value
  const user: any = await Users.findByPk(id_user)
  console.log(user.toJSON())
  const carts = await user.getCart_details({attributes:{exclude: ["id_user"]}})
  let orders_details: any = []
  let total_ammount=0

  for (const cart of carts) { 
    console.log(cart.toJSON())
    let size = await cart.getSize({attributes: ["size"]})
    size = size.toJSON()
    const product_detail = await cart.getProduct_detail({attributes: ["id","id_product","id_color"]})
    console.log(product_detail.toJSON())
    let color = await product_detail.getColor({attributes: ['color']})
    color = color.toJSON()
    let image = await product_detail.getImages({attributes:["image"],joinTableAttributes: []})
    image = image[0].toJSON()
    let product:any = await Products.findByPk(product_detail.id_product, {attributes: [['id','id_product'],'name','gender','season',['sell_price','price']]})
    product=product?.toJSON()
    
    const order_detail = {
      ...product,
      ...image,
      ...size,
      ...color,
      quantity:cart.quantity
    }
    total_ammount=total_ammount+(order_detail.price*order_detail.quantity)
    console.log(order_detail)

    console.log(total_ammount)
    orders_details.push(order_detail)
  }

  /* const order = {
    id_user,
    address_user:"",
    total_ammount,
    order_state:'Pending'
  } */
  // console.log("Carrito:", carts[0].toJSON())
  // const size = await carts[0].getSize()
  // console.log("Size:", size.toJSON())
  // const product_detail = await carts[0].getProduct_detail()
  // console.log("product_detail:", product_detail.toJSON())
  // const product = await Products.findByPk(product_detail.id_product)
  // console.log("Product:",product?.toJSON())
  //Orders.createOrders_detail()


  // const order = {
  //   id_user,
  // }
  return orders_details
  // const { orders_details, ...restOfOrder } = value
  // const createdOrder: any = await Orders.create(restOfOrder)
  // for (const order_detail of orders_details) {
  //   await createdOrder.createOrders_detail(order_detail)
  // }

  // return await Orders.findByPk(createdOrder.id, {
  //   include: {
  //     model: Orders_details
  //   }
  // })
}

export const updateOrders = async (value: any): Promise<any> => {
  // Se busca el usuario por id
  var carrouselByID = await Orders.findByPk(value.id)
  var carrouselDuplicate = await Orders.findAll({ where: { image: String(value.image) } })
  if (carrouselByID !== null) {
    if (carrouselDuplicate.length > 0) {
      return { message: `The carrousel image already exists` }
    }
    carrouselByID.set(value);
    await carrouselByID.save();
    return carrouselByID
  }
  return { message: `We couldn't find the carrousel image for the id: ${value.id}.` };
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
    return { message: `the carrousel image with id: ${id} is already deleted` };
  }
  return { message: `We couldn't find the carrousel image for the id: ${id}` };
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