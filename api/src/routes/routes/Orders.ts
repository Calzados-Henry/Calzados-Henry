'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const { getOrders, createOrders, updateOrders, deleteOrders } = require('../controllers/Orders');
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var orders: string = await getOrders();
    res.json(orders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nOrders: string = await createOrders(req.body)
    res.json(nOrders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putOrders: string = await updateOrders(req.body)
    res.json(putOrders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delOrders: string = await deleteOrders(req.body.id)
    res.json(delOrders)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
module.exports = router;