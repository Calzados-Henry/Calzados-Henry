'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getColor, createColor, updateColor, deleteColor, getColorAll } from '../controllers/Color';
import { userExtractorAdmin } from '../middleware/userExtractor';
const router = Router();

//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/products/details/color = Lista de todos los colores para los productos (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "color": "Negro",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "color": "Blanco",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/products/details/color/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/carrousel = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como objeto.
//* {
//*   "color": "color1",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "color": "color2",        (No se repite) [string]
//*   },
//*   {
//*     "color": "color3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/products/details/color = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "color": "color actualizado"
//* }
//* DELETE http://localhost:3001/products/details/color = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var color = await getColor();
    res.json(color)
  } catch (e) {
    next(e)
  }
})
router.get('/all', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var color = await getColorAll();
    res.json(color)
  } catch (e) {
    next(e)
  }
})
router.post('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nColor = await createColor(req.body)
    res.json(nColor)
  } catch (e) {
    next(e)
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putColor = await updateColor(req.body)
    res.json(putColor)
  } catch (e) {
    next(e)
  }
})
router.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delColor = await deleteColor(req.body.id)
    res.json(delColor)
  } catch (e) {
    next(e)
  }
})
export default router;