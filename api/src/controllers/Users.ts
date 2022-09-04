'use strict'
import { Color, Products, Product_details, Sizes, Users } from '../db';

export const getUsers = async (): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var users: any = await Users.findAll()
  return users.length > 0 ? users : { message: "No hay usuarios" };
}
export const getOneUsers = async (id: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var users: any = await Users.findByPk(id, { include: ['Cart', 'Favourite'] })
  var nObjUser: any = JSON.parse(JSON.stringify(users, null, 2))

  var Carrito: Array<object> = nObjUser.Cart;
  nObjUser.Cart = []
  Carrito.forEach(async (value: any) => {
    var id_product: any = value.id_product
    var id_detail: any = value.id_product_details;
    var quantity: any = value.Cart_details.quantity;

    var producto: any = await Products.findByPk(id_product, { attributes: ['name', 'sell_price'] })
    var details: any = await Product_details.findByPk(id_detail, { include: [Sizes, Color] })

    var productoParse = JSON.parse(JSON.stringify(producto, null, 2))
    var detailsParse = JSON.parse(JSON.stringify(details, null, 2))
    detailsParse = { id_details: id_detail, color: detailsParse.Color.color, Sizes: detailsParse.Sizes, quantity: quantity }

    var sizes: Array<object> = detailsParse.Sizes;
    detailsParse.Sizes = []

    sizes.forEach((s: any) => detailsParse.Sizes.push({ size: s.size, stock: s.Product_details_size.stock }))

    producto = { ...productoParse, ...detailsParse }


    nObjUser.Cart = [producto]
  })
  console.log(Carrito)






  return users ? nObjUser : { message: "No hay usuario con ID: " + id };
}
export const createUsers = async (value: any): Promise<object> => {
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar nuevo usuario.
  var username = await Users.findAll({ where: { username: value.username } })
  var email = await Users.findAll({ where: { email: value.email } })
  var identification = await Users.findAll({ where: { identification: value.identification } })
  // un objeto que almacena los mensajes de error
  interface error {
    username?: string,
    email?: string,
    identification?: string
  }
  // Agrega mensaje al objeto dependiendo de lo que falte.
  if (username.length > 0 || email.length > 0 || identification.length > 0) {
    let error: error = {};
    if (username.length > 0) {
      error.username = "El username ya existe"
    }
    if (email.length > 0) {
      error.email = "El email ya existe"
    }
    if (identification.length > 0) {
      error.identification = "La identificacion ya existe"
    }
    return error;
  }
  // si todo esta correcto crea nuevo usuario.
  return await Users.create(value)
}

export const updateUser = async (value: any): Promise<object> => {
  // Se busca el usuario por id
  var userByID = await Users.findByPk(value.id)
  if (userByID !== null) {
    userByID.set(value);
    await userByID.save();
    return userByID
  }
  return { message: `No se encontro el usuario con ID ${value.id}` };
}
export const deleteUser = async (id: number): Promise<object> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var userByID: any = await Users.findByPk(id)
  if (userByID !== null) {
    if (userByID.isActive) {
      userByID.isActive = false;
      await userByID.save();
      return userByID
    }
    return { message: `El usuario con ID ${id} ya se encuentra Eliminado` };
  }
  return { message: `No se encontro el usuario con ID ${id}` };
}

//!====================================================
//!===================CART_DETAILS=====================
//!====================================================
export const getCart = async (_value: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var cart = await Users.findAll()
  return cart.length > 0 ? cart : { message: "No hay usuarios" };
}
export const addCart = async (value: any): Promise<object> => {

  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var findUser: any = await Users.findByPk(value.id_user)
  console.log(findUser)
  await findUser.addCart(value.id_product_details, { through: { quantity: value.quantity } })
  return findUser
}
export const updateCart = async (_value: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var users = await Users.findAll()
  return users.length > 0 ? users : { message: "No hay usuarios" };
}
export const deleteCart = async (_value: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var users = await Users.findAll()
  return users.length > 0 ? users : { message: "No hay usuarios" };
}