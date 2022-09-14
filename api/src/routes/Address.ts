"use strict"
import { postAddress, getAddress, patchAddress, deleteAddress } from "../controllers/Address"
import { Router, Request, Response, NextFunction } from "express"
import { userExtractorUser } from "../middleware/userExtractor"
// const { getCategories } = Categories

//Breve Documentacion:
// Ruta GET/addresses:id --> trae todos los direcciones
// Ruta POST/address/:id--> se envia por body la nueva categoría como un "string".

// Ruta PATCH/ --> se envia por body un objeto cuya primera key
// debe llamarse ser el 'id'
// y la segunda key debe llamarse 'update' y el value tiene que ser el valor actualizado.
// ej:
// {
//     id:"1",
//     update:"zapatos"
// }
//Ruta DELETE/category --> se envia por body un objeto con id de la categoria a eliminar ("logicamente")
//y la categoria, Ejemplo:
// {
//     id:1,
//     category:'zapatos'
// }

const Address = Router()

Address.get("/", /* userExtractorUser, */ async (req: Request, res: Response, next: NextFunction) => {
  try {
    let addresses = await getAddress(req.params.id)
    if (addresses) {
      res.json(addresses)
    }
  } catch (e) {
    next(e)
  }
})

Address.post("/", /* userExtractorUser, */ async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postedAddress = await postAddress(req.params.id, req.body)
    console.log(postedAddress)
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
