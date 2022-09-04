'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { getSize, createSize, updateSize, deleteSize } from '../controllers/Sizes';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var size = await getSize();
    res.json(size)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nSize = await createSize(req.body)
    res.json(nSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putSize = await updateSize(req.body)
    res.json(putSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delSize = await deleteSize(req.body.id)
    res.json(delSize)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;