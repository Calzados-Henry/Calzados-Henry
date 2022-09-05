'use strict'
import { Color, Products, Product_details, Sizes, Users } from '../db';
import { carrito, favoritos } from '../types';

export const getUsers = async (): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var users: any = await Users.findAll()
  return users.length > 0 ? users : { message: "No hay usuarios" };
}

export const getAllValuesOneUsers = async (id: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".

  var users: any = await Users.findByPk(id, { include: ['cart', 'favs'] })
  var nObjUser: any = JSON.parse(JSON.stringify(users, null, 2))

  var Carrito: Array<object> = nObjUser.cart;
  var Favs: Array<object> = nObjUser.favs;
  nObjUser.cart = []
  nObjUser.favs = []
  for (var vFavs of Favs) {
    //FAVORITOS
    var fValue: any = vFavs

    var id_productF: any = fValue.id_product
    var id_detailF: any = fValue.favourite.id_product_details;

    var productoF: any = await Products.findByPk(id_productF, { attributes: ['name', 'sell_price'] })
    var detailsF: any = await Product_details.findByPk(id_detailF, { include: [Sizes, Color] })

    var productoPF = JSON.parse(JSON.stringify(productoF, null, 2))
    var detailsPF = JSON.parse(JSON.stringify(detailsF, null, 2))

    var favs: Array<object> = detailsPF.Sizes;
    detailsPF.Sizes = []
    favs.forEach((s: any) => detailsPF.Sizes.push({ size: s.size, stock: s.Product_details_size.stock }))


    var nFavs: favoritos = {
      id_details: id_detailF,
      name: productoPF.name,
      color: detailsPF.Color.color,
      size: detailsPF.Sizes,
      price: productoPF.sell_price
    }
    nObjUser.favs.push(nFavs)
    //FAVORITOS
  }

  for (var vCarrito of Carrito) {
    //CARRITO y Favoritos
    var cValue: any = vCarrito

    var id_product: any = cValue.id_product
    var id_detail: any = cValue.Cart_details.id_product_details;
    var quantity: any = cValue.Cart_details.quantity;

    var producto: any = await Products.findByPk(id_product, { attributes: ['name', 'sell_price'] })
    var details: any = await Product_details.findByPk(id_detail, { include: [Sizes, Color] })

    var productoP = JSON.parse(JSON.stringify(producto, null, 2))
    var detailsP = JSON.parse(JSON.stringify(details, null, 2))

    var sizes: Array<object> = detailsP.Sizes;
    detailsP.Sizes = []
    sizes.forEach((s: any) => detailsP.Sizes.push({ size: s.size, stock: s.Product_details_size.stock }))

    var carritoN: carrito = {
      id_details: id_detail,
      name: productoP.name,
      color: detailsP.Color.color,
      size: detailsP.Sizes,
      price: productoP.sell_price,
      quantity: quantity
    }
    nObjUser.cart.push(carritoN)
    //CARRITO
  }

  return users ? await nObjUser : { message: "No hay usuario con ID: " + id };
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


//!====================================================
//!===================FAVORITOS========================
//!====================================================


export const getFavs = async (id: any): Promise<object> => {

  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  console.log(id)
  var users: any = await Users.findByPk(id, { include: 'favs' })

  return users ? users : { message: "No hay usuarios" };
}
export const addFavs = async (value: any): Promise<object> => {
  var { id_user, id_product_details } = value;
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".

  var users: any = await Users.findByPk(id_user)
  await users.addFavs(id_product_details)

  return users ? users : { message: "No hay usuarios" };
}

