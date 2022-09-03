'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const { getCarrousel, createCarrousel, updateCarrousel, deleteCarrousel } = require('../controllers/Carrousel');
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var carrousel: string = await getCarrousel();
    res.json(carrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var ncarrousel: string = await createCarrousel(req.body)
    res.json(ncarrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putcarrousel: string = await updateCarrousel(req.body)
    res.json(putcarrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delcarrousel: string = await deleteCarrousel(req.body.id)
    res.json(delcarrousel)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;