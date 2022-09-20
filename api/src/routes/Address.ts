"use strict"
import { postAddress, getAddress, patchAddress, deleteAddress } from "../controllers/Address"
import { Router, Request, Response, NextFunction } from "express"
import { userExtractorUser } from "../middleware/userExtractor"

//Breve Documentacion:

// Ruta GET/address --> Trae todas las direcciones asociadas al usuario que hace la peticion,
// se toma el id del token que envia en la peticion.

// Ruta POST/address/--> No hace falta enviar el ID del usuario, se lo toma de la autenticacion del token.
// Se debe enviar por body en formato JSON con la siguiente estructura:
// {
//   "title": "Casita",
//   "address": "Barrio siglo 20 mza 30 lote 53",
//   "city": "Santiago del Estero",
//   "state": "Santiago del Estero",
//   "country": "Argentina",
//   "zip_code": "4200"
// }

// Ruta PATCH/ --> Se debe enviar por Body el id de la direccion (address) que se quiera modificar del usuario
//
// Tambien deben ir los demas atributos en el body que se quieran modificar: (title, address, city, state, country, zip_code)
// {
//   "id":1,
//   "title": "casota 2"
// }

//Ruta DELETE/category --> se envia por body un objeto con id de la direccion a eliminar ("logicamente")
// Ejemplo:
// {
//     id:1,
// }

const Address = Router()

Address.get("/", userExtractorUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let addresses: any = await getAddress(req.params.id)

    res.json(addresses)
  } catch (e) {
    next(e)
  }
})

Address.post("/", userExtractorUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postedAddress = await postAddress(req.params.id, req.body)
    if (postedAddress) {
      res.json(postedAddress)
    }
  } catch (e) {
    next(e)
  }
})

Address.patch("/", userExtractorUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patchedAddress = await patchAddress(req.body)
    if (patchedAddress) {
      res.json(patchedAddress)
    }
  } catch (e) {
    next(e)
  }
})

Address.delete("/", userExtractorUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedAddress = await deleteAddress(req.body)
    if (deletedAddress) {
      res.json(deletedAddress)
    }
  } catch (e) {
    next(e)
  }
})

export default Address
