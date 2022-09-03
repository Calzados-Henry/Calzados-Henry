'use strict'
//require
const { getCategories, postCategory, patchCategory, deleteCategory } = require('../controllers/Categories')
import { Router, Request, Response } from "express"
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

Category.get('/', async (_req: Request, res: Response) => {
  try {
    let categories: string = await getCategories()
    if (categories) {
      res.json(categories)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

Category.post('/', async (req: Request, res: Response) => {
  try {
    const createdCategory = await postCategory(req.body.category)
    if (createdCategory) {
      res.json(createdCategory)
    }
  } catch (e) {
    res.status(400).json({ error: 'Hubo algun error' })
  }
})
Category.patch('/', async (req: Request, res: Response) => {
  try {
    const patchedCategory = await patchCategory(req.body)
    if (patchedCategory) {
      res.json(patchedCategory)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})
Category.delete('/', async (req: Request, res: Response) => {
  try {
    const patchedCategory = await deleteCategory(req.body)
    if (patchedCategory) {
      res.json(patchedCategory)
    }
  } catch (e: any) {
    res.status(400).json({ error: e.message })
  }
})

export default Category