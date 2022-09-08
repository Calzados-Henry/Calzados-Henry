'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getProducts, createProducts, updateProducts, deleteProducts } from '../controllers/Products';
import { userExtractorAdmin } from '../middleware/userExtractor';
const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var products = await getProducts();
    res.json(products)
  } catch (e) {
    next(e)
  }
})
router.post('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var nProducts = await createProducts(req.body)
    res.json(nProducts)
  } catch (e) {
    next(e)
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putProducts = await updateProducts(req.body)
    res.json(putProducts)
  } catch (e) {
    next(e)
  }
})
router.delete('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var delProducts = await deleteProducts(req.body.id)
    res.json(delProducts)
  } catch (e) {
    next(e)
  }
})
export default router;