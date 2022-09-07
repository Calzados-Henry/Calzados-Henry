'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const jwt = require('jsonwebtoken')
import { getCarrousel, createCarrousel, updateCarrousel, deleteCarrousel, getCarrouselAll } from '../controllers/Carrousel';
import { TypeUser } from '../enum';
const router = Router();

//* README *

//* GET http://localhost:3001/carrousel/ = Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "image": "foTO2",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "image": "foTO3",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/carrousel/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)

//* POST http://localhost:3001/carrousel = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "imagen": "link_de_la_imagen1",        (No se repite) [string]
//*   }
//* ]
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "imagen": "link_de_la_imagen1",        (No se repite) [string]
//*   },
//*   {
//*     "imagen": "link_de_la_imagen2",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/carrousel = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "imagen": "link_de_la_nueva_imagen"
//* }
//* DELETE http://localhost:3001/carrousel = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }


// TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
router.get('/', async (_req: Request, res: Response) => {
  try {
    var carrousel = await getCarrousel();
    res.json(carrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

// TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
router.get('/all', async (_req: Request, res: Response) => {
  try {
    var carrouselAll = await getCarrouselAll();
    res.json(carrouselAll)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

// TODO => Envio de datos, ver ejemplo arriba ↑
router.post('/', async (req: Request, res: Response) => {
  var { Administrator } = TypeUser
  try {
    const authorization = req.get('authorization')
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    if (token && decodedToken.type_user === Administrator) {
      try {
        var ncarrousel = await createCarrousel(req.body)
        res.json(ncarrousel)
      } catch (e: any) {
        res.json({ error: e.name })
      }
    } else {
      res.status(404).json({ error: "Error: No tienes permisos avanzados." })
    }
  } catch (error: any) {
    res.status(404).json({ error: "Token no valido o faltante." })
  }
})

// TODO => Actualizacion de datos, ver ejemplo arriba ↑
router.put('/', async (req: Request, res: Response) => {
  try {
    var putcarrousel = await updateCarrousel(req.body)
    res.json(putcarrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})

// TODO => Eliminacion de datos, ver ejemplo arriba ↑
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delcarrousel = await deleteCarrousel(req.body.id)
    res.json(delcarrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;