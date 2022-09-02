'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
const { getSize, createSize, updateSize, deleteSize } = require('../controllers/Size');
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var size: string = await getSize();
    res.json(size)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nSize: string = await createSize(req.body)
    res.json(nSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putSize: string = await updateSize(req.body)
    res.json(putSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delSize: string = await deleteSize(req.body.id)
    res.json(delSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
module.exports = router;