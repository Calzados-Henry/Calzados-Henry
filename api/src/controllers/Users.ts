"use strict"
import { Color, Images, Products, Product_details, Sizes, Users, Cart_details } from "../db"
const bcrypt = require("bcrypt")
import { carrito, favoritos } from "../types"
import { send } from "./NotificationMail"

async function formatValueUsers(nObjUser: any) {

	var Carrito: Array<object> = nObjUser.cart;
	var Favs: Array<object> = nObjUser.favs;
	var totalCarrito = 0;
	var arrayCarrito = [];
	nObjUser.cart = [];
	nObjUser.favs = [];
	if (Favs) {
		for (var vFavs of Favs) {
			//FAVORITOS
			var fValue: any = vFavs;
      
			var id_detailsF: any = fValue.favourite.id_product_details;

			var productoF: any = await Products.findByPk(id_detailsF, { attributes: ['name', 'sell_price'] });
			var detailsF: any = await Product_details.findByPk(id_detailsF, { include: [Images, Sizes, Color] });
      
			var productoPF = JSON.parse(JSON.stringify(productoF, null, 2));
			var detailsPF = JSON.parse(JSON.stringify(detailsF, null, 2));


			const newSizes: Array<object> = [];
			detailsPF.Sizes.forEach((s: any) => newSizes.push({ id: s.id, size: s.size, stock: s.Product_details_size.stock, isActive: s.isActive }));

			var nFavs: favoritos = {
				id_details: id_detailsF,
				name: productoPF.name,
        		image: detailsPF.Images[0].image,
				color: detailsPF.Color.color,
				sizes: newSizes,
				price: productoPF.sell_price,
			};
			nObjUser.favs.push(nFavs);
			//FAVORITOS
		}
	}

	if (Carrito) {
		for (var vCarrito of Carrito) {
			//CARRITO
			var cValue: any = vCarrito;

			var id_product: any = cValue.id_product;
			var id_detail: any = cValue.Cart_details.id_product_details;
			var quantity: any = cValue.Cart_details.quantity;
			var idSize: any = cValue.Cart_details.id_size;

			var producto: any = await Products.findByPk(id_product, { attributes: ['name', 'sell_price'] });
			var details: any = await Product_details.findByPk(id_detail, { include: [Images, Sizes, Color] });

			var productoP = JSON.parse(JSON.stringify(producto, null, 2));
			var detailsP = JSON.parse(JSON.stringify(details, null, 2));

			var sizes: Array<any> = detailsP.Sizes;
			var filterSize = sizes.find((el) => el.id === idSize);
			var formatedSize = {
				id: filterSize.id,
				size: filterSize.size,
				stock: filterSize.Product_details_size.stock,
			};

			detailsP.Sizes = [];
			sizes.forEach((s: any) =>
				detailsP.Sizes.push({ id: s.id, size: s.size, stock: s.Product_details_size.stock })
			);

			var carritoN: carrito = {
				id_details: id_detail,
				image: detailsP.Images[0].image,
				name: productoP.name,
				color: detailsP.Color.color,
				size: detailsP.Sizes,
				price: productoP.sell_price,
				sizeCart: formatedSize,
				quantity: quantity,
			};
			arrayCarrito.push(carritoN);
			totalCarrito += carritoN.price * carritoN.quantity;
			//CARRITO
		}
		nObjUser.cart = { arrayCarrito: arrayCarrito, totalCarrito: totalCarrito };
	}
	return nObjUser;

}
async function verificarUser(params: any) {
  var findUser: any = await Users.findByPk(params)
  if (findUser) {
    return true
  } else {
    throw new Error("No existe el usuario.")
  }
}
async function verificarProducto(params: any) {
  var findUser: any = await Product_details.findByPk(params)
  if (findUser) {
    return true
  } else {
    throw new Error("No existe el Producto.")
  }
}
export const getAllValuesUsers = async (value: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
  var { id, username, email } = value

  if (id) {
    let users = await Users.findByPk(id, { include: ["cart", "favs"] })
    var nObjUser: any = JSON.parse(JSON.stringify(users, null, 2))
    if (nObjUser) {
      return await formatValueUsers(nObjUser)
    } else {
      return { message: "we couldn't find user with id: " + id }
    }
  } else if (username) {
    let userName = await Users.findOne({ where: { username: username }, include: ["cart", "favs"] })
    var nObjUser: any = JSON.parse(JSON.stringify(userName, null, 2))
    if (nObjUser) {
      return await formatValueUsers(nObjUser)
    } else {
      return { message: "we couldn't find user with username:" + username }
    }
  } else if (email) {
    let userEmail = await Users.findOne({ where: { email: email }, include: ["cart", "favs"] })
    var nObjUser: any = JSON.parse(JSON.stringify(userEmail, null, 2))
    if (nObjUser) {
      return await formatValueUsers(nObjUser)
    } else {
      return { message: "there's no exist any user with the email: " + email }
    }
  } else {
    let users = await Users.findAll()
    return users.length > 0 ? users : { message: "there're not users" }
  }
}
export const createUsers = async (value: any): Promise<object> => {
  const hashPassword = await bcrypt.hashSync(value.password, 10)
  value = { ...value, password: hashPassword }
  // Se verifica en las columnas UNIQUE si existe dicho valor antes de agregar nuevo usuario.
  var username = await Users.findAll({ where: { username: value.username } })
  var email = await Users.findAll({ where: { email: value.email } })
  var identification = await Users.findAll({ where: { identification: value.identification } })
  // un objeto que almacena los mensajes de error
  interface error {
    username?: string
    email?: string
    identification?: string
  }
  // Agrega mensaje al objeto dependiendo de lo que falte.
  if (username.length > 0 || email.length > 0 || identification.length > 0) {
    let error: error = {}
    if (username.length > 0) {
      error.username = "the username already exists"
    }
    if (email.length > 0) {
      error.email = "the email already exists"
    }
    if (identification.length > 0) {
      error.identification = "The identification already exists"
    }
    return error
  }
  var nUser: any = await Users.create(value)
  send(value.email, `Bienvenido a SEHOS STORE`, `Gracias por tu registro: ${value.name} ${value.last_name}`)
  return nUser
}
export const updateUser = async (value: any): Promise<object> => {

if (value.password?.length) {
		const hashPassword = bcrypt.hashSync(value.password, 10);
		value = { ...value, password: hashPassword };
	}
	// Se busca el usuario por id
  var userByID = await Users.findByPk(value.id)
  if (userByID !== null) {
    userByID.set(value)
    await userByID.save()
    return userByID
  }
  return { message: `we couldn't find user with id: ${value.id}` }
}

export const updatePassword = async (value: any): Promise<object> => {
  const hashPassword = bcrypt.hashSync(value.password, 10)
  value = { ...value, password: hashPassword }
  // Se busca el usuario por id
  var userByID = await Users.findByPk(value.id)
  if (userByID !== null) {
    userByID.set(value)
    await userByID.save()
    return userByID
  }
  return { message: `we couldn't find user with id: ${value.id}` }
}

export const deleteUser = async (id: number): Promise<object> => {
  // Se busca el usuario por id para luego darle una baja logica, solo se actualiza el isActive de true a false.
  var userByID: any = await Users.findByPk(id)
  if (userByID !== null) {
    if (userByID.isActive) {
      userByID.isActive = false
      await userByID.save()
      return userByID
    }
    return { message: `the user with id: ${id} is already 'deleted'` }
  }
  return { message: `we couldn't find the user with id: ${id}` }
}

//!====================================================
//!===================CART_DETAILS=====================
//!====================================================
export const getCart = async (idUser: number): Promise<object> => {

	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	const added: any = await Users.findByPk(idUser, { include: ['cart'] });
	var nObjUser: any = JSON.parse(JSON.stringify(added));
	const userCart = await formatValueUsers(nObjUser);
	return userCart.cart;
};
export const addToCart = async (value: any): Promise<object> => {
	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	console.log(value);
	const { id_user, id_product_details, id_size, quantity } = value;
	await verificarUser(id_user);
	await verificarProducto(id_product_details);

	var findUser: any = await Users.findByPk(id_user, { include: ['cart'] });
	await findUser.addCart(id_product_details, { through: { quantity, id_size } });
	const added = await Users.findByPk(id_user, { include: ['cart'] });
	var nObjUser: any = JSON.parse(JSON.stringify(added));
	const userCart = await formatValueUsers(nObjUser);
	return userCart.cart;
};
export const updateCart = async (value: any): Promise<object> => {
	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	const { id_user, id_product_details, quantity, id_size } = value;
	await verificarUser(id_user);
	await verificarProducto(id_product_details);

	if (quantity) {
		await Cart_details.update(
			{ quantity },
			{ where: { id_user: id_user, id_product_details: id_product_details } }
		);
	}
	if (id_size) {
		const finded = await Sizes.findByPk(id_size);
		if (finded)
			await Cart_details.update(
				{ id_size },
				{ where: { id_user: id_user, id_product_details: id_product_details } }
			);
		else throw new Error('That size is not defined');
	}
	let users: any = await Users.findByPk(id_user, { include: ['cart', 'favs'] });
	var nObjUser: any = JSON.parse(JSON.stringify(users));
	const userCart = await formatValueUsers(nObjUser);
	return userCart.cart;
};
export const deleteCart = async (value: any): Promise<object> => {
	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	await verificarUser(value.id_user);
	await verificarProducto(value.id_product_details);

	await Cart_details.destroy({
		where: { id_user: value.id_user, id_product_details: value.id_product_details },
	});
	let findUser: any = await Users.findByPk(value.id_user, { include: ['cart', 'favs'] });
	var nObjUser: any = JSON.parse(JSON.stringify(findUser, null, 2));
	const userCart = await formatValueUsers(nObjUser);
	return userCart.cart;
};
export const allDeleteCart = async (value: any): Promise<object> => {
	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	await verificarUser(value.id_user);

	await Cart_details.destroy({ where: { id_user: value.id_user } });
	let users: any = await Users.findByPk(value.id_user, { include: ['cart'] });
	return users.cart;
};

//!====================================================
//!===================FAVORITOS========================
//!====================================================

export const getFavourites = async (id: any): Promise<object> => {
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".

  var userFinded: any = await Users.findByPk(id, { include: "favs" })
  let messageError:string = '';

  if(!userFinded) messageError = "Don't found any user"
  if(!userFinded.favs) messageError = "Don't have any products yet"
  const userFavs = await formatValueUsers(userFinded);

  return !messageError ? userFavs.favs : { message: messageError }
}

export const addFavourites = async (body: any): Promise<object> => {
  var { id_user, id_product_details } = body
  // Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios"
  var userFinded: any = await Users.findByPk(id_user)
  await userFinded.addFavs(id_product_details)
  var userUpdated: any = await Users.findByPk(id_user, { include: "favs" })
  const userFavs = await formatValueUsers(userUpdated);
  return userFavs ? userFavs.favs : { message: "Don't have any products yet" }
}

export const deleteFavourite = async (body: any): Promise<object> => {
	// Se trae todos los usuario, si no hay usuario muestra un mensaje "No hay ususarios".
	var { id_user, id_product_details } = body
	await verificarUser(id_user);
	await verificarProducto(id_product_details);

	var userFinded: any = await Users.findByPk(id_user)
	await userFinded.removeFavs(id_product_details)
	var userUpdated: any = await Users.findByPk(id_user, { include: "favs" })
	const userFavs = await formatValueUsers(userUpdated);
	return userFavs ? userFavs.favs : { message: "Don't have any products yet" }
}
