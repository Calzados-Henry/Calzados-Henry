'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/Products');
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var products: string = await getProducts();
    res.json(products)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nProducts: string = await createProducts(req.body)
    res.json(nProducts)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putProducts: string = await updateProducts(req.body)
    res.json(putProducts)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delProducts: string = await deleteProducts(req.body.id)
    res.json(delProducts)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;