'use strict'
// se requiere el models
import { Router, Request, Response, NextFunction } from 'express';
import { getProducts, createProducts, updateProducts, deleteProducts, getProductsAdmin, getProductById } from '../controllers/Products';
import { userExtractorAdmin } from '../middleware/userExtractor';
import fileUpload from 'express-fileupload'
const router = Router();


router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    var products = await getProducts();
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.get('/id/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    console.log(id)
     const product = await getProductById(Number(id))
     res.json(product)
  } catch (error) {
    next(error)
  } 
  
})


router.get('/dashboard',/* userExtractorAdmin, */ async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {time, category} = req.body
    var products = await getProductsAdmin(time, category);
    res.json(products)
  } catch (e) {
    next(e)
  }
})



router.post('/', /* userExtractorAdmin, */ fileUpload({ useTempFiles: true, tempFileDir: './src/uploads' }), async (req: Request, res: Response, _next: NextFunction) => {
  try {
    console.log(req.files);
    var nProducts: string = await createProducts(req)
    res.json(nProducts)
  } catch (e:any) {
    // next(e)
    res.send(e.message)
  }
})
router.put('/', userExtractorAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    var putProducts = await updateProducts(req.body)
    res.json(putProducts)
  } catch (e) {
    console.log(e)
    next(e)
  }
})
router.delete('/', /* userExtractorAdmin, */ async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body.id)
    var delProducts = await deleteProducts(req.body.id)
    res.json(delProducts)
  } catch (e) {
    next(e)
  }
})
export default router;