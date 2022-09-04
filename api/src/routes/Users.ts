'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { getUsers, createUsers, updateUser, deleteUser, addCart, getCart, updateCart, deleteCart, getOneUsers } from '../controllers/Users';
const router = Router();

//* README *

//* GET http://localhost:3001/users = trae todos los usuarios (solo informacion)
//* GET http://localhost:3001/users/1 = pide Usuario ID: 1 (informacion + carrito + favoritos)
//* POST http://localhost:3001/users = mandar datos es por body, ejemplo ↓
//* {
//*   "username": "Usuario",        (No se repite) [string]
//*   "password": "Contraseña",                    [string]
//*   "email": "Correo",            (No se repite) [string]
//*   "name": "Nombres",                           [string]
//*   "last_name": "Apellidos",                    [string]
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

router.get('/', async (_req: Request, res: Response) => {
  try {
    var users = await getUsers();
    res.json(users)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.get('/:id', async (req: Request, res: Response) => {
  try {
    var users = await getOneUsers(req.params.id);
    res.json(users)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nUser = await createUsers(req.body)
    res.json(nUser)
  } catch (e: any) {
    res.json({ error: e.message })
  }
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



export default router;