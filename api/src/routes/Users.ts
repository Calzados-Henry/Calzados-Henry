'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
const bcrypt = require('bcrypt');
import { createUsers, updateUser, deleteUser, addCart, getCart, updateCart, deleteCart, getAllValuesUsers, addFavs, getFavs } from '../controllers/Users';

const router = Router();

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
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    var users = await getAllValuesUsers(req.query);
    res.json(users)
  } catch (e) {
    next(e)
  }
})
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nUser = await createUsers(req.body)
    res.json(nUser)
  } catch (e) {
    next(e)
  }
})
router.post('/prueba', async (req: Request, res: Response) => {
  const salt = bcrypt.hashSync(req.body.prueba, 15)
  res.json(salt)
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putUser = await updateUser(req.body)
    res.json(putUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delUser = await deleteUser(req.body.id)
    res.json(delUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})


//!====================================================
//!===================CART_DETAILS=====================
//!====================================================

router.get('/cart', async (req: Request, res: Response) => {
  try {
    var cart = await getCart(req.body)
    res.json(cart)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/cart', async (req: Request, res: Response) => {
  try {
    var cart = await addCart(req.body)
    res.json(cart)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/cart', async (req: Request, res: Response) => {
  try {
    var cart = await updateCart(req.body)
    res.json(cart)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/cart', async (req: Request, res: Response) => {
  try {
    var delCart = await deleteCart(req.body)
    res.json(delCart)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

//!=========================================================================
//* FAVORITES

router.get('/favs/:id', async (req: Request, res: Response) => {
  try {
    var nUser = await getFavs(req.params.id)
    res.json(nUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

router.post('/favs', async (req: Request, res: Response) => {
  try {
    var nUser = await addFavs(req.body)
    res.json(nUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

export default router;