'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getCarrousel, createCarrousel, updateCarrousel, deleteCarrousel, getCarrouselAll } from '../controllers/Carrousel';
import { userExtractorAdmin } from '../middleware/userExtractor';

const router = Router();

//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
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
//* {
//*   "imagen": "link_de_la_imagen1",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "imagen": "link_de_la_imagen2",        (No se repite) [string]
//*   },
//*   {
//*     "imagen": "link_de_la_imagen3",        (No se repite) [string]
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
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var carrousel = await getCarrousel();
    res.status(200).json(carrousel)
  } catch (e) {
    next(e)
  }
})

// TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
router.get('/all', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var carrouselAll = await getCarrouselAll();
    res.status(200).json(carrouselAll)
  } catch (e) {
    next(e)
  }
})

// TODO => Envio de datos, ver ejemplo arriba ↑
router.post('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var ncarrousel = await createCarrousel(req.body)
    res.status(200).json(ncarrousel)
  } catch (e) {
    next(e)
  }
})

// TODO => Actualizacion de datos, ver ejemplo arriba ↑
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putcarrousel = await updateCarrousel(req.body)
    res.status(200).json(putcarrousel)
  } catch (e) {
    next(e)
  }
})

// TODO => Eliminacion de datos, ver ejemplo arriba ↑
router.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delcarrousel = await deleteCarrousel(req.body.id)
    res.status(200).json(delcarrousel)
  } catch (e) {
    next(e)
  }
})
export default router;