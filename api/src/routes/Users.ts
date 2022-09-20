"use strict"
// se requiere el models
import { Router, Request, Response, NextFunction } from "express"
import {
  createUsers,
  updateUser,
  deleteUser,
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  getAllValuesUsers,
  addFavourites,
  getFavourites,
  allDeleteCart,
  updatePassword,
  deleteFavourite,
} from "../controllers/Users"
import { Users } from "../db"

const router = Router()

//* README *

//* GET http://localhost:3001/users = trae todos los usuarios (solo informacion)
//* GET http://localhost:3001/users?id=1 = pide Usuario ID: 1 (informacion + carrito + favoritos)
//* GET http://localhost:3001/users?username=jesner = pide Usuario username: jesner (informacion + carrito + favoritos)
//* GET http://localhost:3001/users?email=jesner631@gmail.com = pide Usuario email: correo@corre.com (informacion + carrito + favoritos)
//* POST http://localhost:3001/users = mandar datos es por body, ejemplo ↓
//* {
//*   "username": "Usuario",        (No se repite) [string]
//*   "password": "Contraseña",                    [string]
//*   "email": "Correo",            (No se repite) [string]
//*   "name": "Nombres",                           [string]
//*   "last_name": "Apellidos",                    [string]
//*   "birth_date":"1994/05/13"                    [string] respetar formato, [año/mes/dia]
//*   "phone": "Cel o Telf",                       [string]
//*   "identification": DNI,        (No se repite) [integer]
//*   "type_user": "Administrator",                [string: enum] ('Administrator', 'Employee', 'User')
//* }
//* PUT http://localhost:3001/users = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                      (ID del usuario)
//*   "name": "Nombres nuevos"
//*   "last_name": "Apellidos nuevos",
//*   "phone": "Cel o Telf Nuevos"
//* }
//* DELETE http://localhost:3001/users = mandar datos es por body, solo mandar el id del usuario a eliminar, ejemplo ↓
//* NOTA: El usuario no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                      (ID del usuario)
//* }

// TODO => Pide un usuarios por id || username, email.
//* Si no se manda nada trae todos los usuarios.
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var users = await getAllValuesUsers(req.query)
    res.json(users)
  } catch (e) {
    next(e)
  }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nUser = await createUsers(req.body)
    res.json(nUser)
  } catch (e) {
    next(e)
  }
})

router.put("/", async (req: Request, res: Response) => {
  try {
    Number(req.body.identification)
    var putUser = await updateUser(req.body)
    res.json(putUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

router.put("/password", async (req: Request, res: Response) => {
  try {
    var putUser = await updatePassword(req.body)
    res.json(putUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

router.delete("/", async (req: Request, res: Response) => {
  try {
    var delUser = await deleteUser(req.body.id)
    res.json(delUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

// DELETE ----> http:localhost:3001/users/delete/:id
// se ingresa por params el id del usuario a eliminar
// !! Atencion, es eliminacion fisica, solo para valientes.

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = await Users.findByPk(id)
    if (user) {
      await user.destroy()
      res.json(user)
    } else {
      res.status(404).json({ error: "User inexistent" })
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
})

//!====================================================
//!===================CART_DETAILS=====================
//!====================================================

router.get("/cart/:idUser", async (req: Request, res: Response, next: NextFunction) => {
  const { idUser } = req.params
  try {
    var cart = await getCart(parseInt(idUser))
    res.json(cart)
  } catch (e) {
    next(e)
  }
})

router.post("/cart", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var cart = await addToCart(req.body)
    res.json(cart)
  } catch (e: any) {
    next(e)
  }
})
router.put("/cart", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var cart = await updateCart(req.body)
    res.json(cart)
  } catch (e: any) {
    next(e)
  }
})
router.delete("/cart", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delCart = await deleteCart(req.body)
    res.json(delCart)
  } catch (e: any) {
    next(e)
  }
})
router.delete("/cart/all", async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delCart = await allDeleteCart(req.body)
    res.json(delCart)
  } catch (e: any) {
    next(e)
  }
})
//!=========================================================================
//* FAVORITES

router.get("/favs/:id", async (req: Request, res: Response) => {
  try {
    var nUser = await getFavourites(req.params.id)
    res.json(nUser)
  } catch (e: any) {
    res.status(404).json({ error: e.message })
  }
})

router.post("/favs", async (req: Request, res: Response) => {
  try {
    var nUser = await addFavourites(req.body)
    res.json(nUser)
  } catch (e: any) {
    res.status(404).json({ error: e.message })
  }
})

router.delete("/favs", async (req: Request, res: Response) => {
  try {
    var nUser = await deleteFavourite(req.body)
    res.json(nUser)
  } catch (e: any) {
    res.status(404).json({ error: e.message })
  }
})

export default router
