'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getSize, createSize, updateSize, deleteSize, getSizeAll } from '../controllers/Sizes';
import { userExtractorAdmin } from '../middleware/userExtractor';
const router = Router();

//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/products/details/sizes = Lista de todos los colores para los productos (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*       "id": 1,
//*       "size": "M",
//*       "isActive": true
//*   },
//*   {
//*       "id": 2,
//*       "size": "s",
//*       "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/products/details/sizes/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/products/details/sizes = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como objeto.
//* {
//*   "size": "talla",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "size": "talla2",        (No se repite) [string]
//*   },
//*   {
//*     "size": "talla3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/products/details/sizes = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "size": "talla actualizado"
//* }
//* DELETE http://localhost:3001/products/details/sizes = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var size = await getSize();
    res.json(size)
  } catch (e) {
    next(e)
  }
})
router.get('/all', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var size = await getSizeAll();
    res.json(size)
  } catch (e) {
    next(e)
  }
})
router.post('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nSize = await createSize(req.body)
    res.json(nSize)
  } catch (e) {
    next(e)
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putSize = await updateSize(req.body)
    res.json(putSize)
  } catch (e) {
    next(e)
  }
})
router.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delSize = await deleteSize(req.body.id)
    res.json(delSize)
  } catch (e) {
    next(e)
  }
})
export default router;