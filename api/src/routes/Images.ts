'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getImages, createImages, updateImages, deleteImages } from '../controllers/Images';
import { userExtractorAdmin } from '../middleware/userExtractor';
import fileUpload from 'express-fileupload'


const router = Router();

//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/products/details/images = Lista de todos los colores para los productos (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "image": "g",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "image": "5",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/products/details/images/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/products/details/images = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como objeto.
//* {
//*   "image": "link image",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "image": "link image2",        (No se repite) [string]
//*   },
//*   {
//*     "image": "link image3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/products/details/images = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "color": "link image actualizado"
//* }
//* DELETE http://localhost:3001/products/details/images = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }


router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var images: string = await getImages();
    res.json(images)
  } catch (e) {
    next(e)
  }
})
router.post('/', userExtractorAdmin, fileUpload({ useTempFiles: true, tempFileDir: './src/uploads' }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nImages: string = await createImages(req)
    res.json(nImages)
  } catch (e) {
    next(e)
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putImages: string = await updateImages(req.body)
    res.json(putImages)
  } catch (e) {
    next(e)
  }
})
router.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delImages: string = await deleteImages(req.body.id)
    res.json(delImages)
  } catch (e) {
    next(e)
  }
})
export default router;