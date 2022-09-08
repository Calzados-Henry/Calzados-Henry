'use strict'
//require
import { getCategories, postCategory, patchCategory, deleteCategory } from '../controllers/Categories'
import { Router, Request, Response, NextFunction } from "express"
import { userExtractorAdmin } from '../middleware/userExtractor'
// const { getCategories } = Categories

//Breve Documentacion:
// Ruta GET/category --> trae todas las categorías

// Ruta POST/category --> se envia por body la nueva categoría como un "string".

// Ruta PATCH/category --> se envia por body un objeto cuya primera key 
// debe llamarse ser el 'id' 
// y la segunda key debe llamarse 'update' y el value tiene que ser el valor actualizado.
// ej: 
// {
//     id:"1",
//     update:"zapatos"
// }


const Category = Router()

Category.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let categories = await getCategories()
    if (categories) {
      res.json(categories)
    }
  } catch (e) {
    next(e)
  }
})

Category.post('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdCategory = await postCategory(req.body)
    if (createdCategory) {
      res.json(createdCategory)
    }
  } catch (e) {
    next(e)
  }
})
Category.patch('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patchedCategory = await patchCategory(req.body)
    if (patchedCategory) {
      res.json(patchedCategory)
    }
  } catch (e) {
    next(e)
  }
})
Category.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patchedCategory = await deleteCategory(req.body)
    if (patchedCategory) {
      res.json(patchedCategory)
    }
  } catch (e) {
    next(e)
  }
})

export default Category