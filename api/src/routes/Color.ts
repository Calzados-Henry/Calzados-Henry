'use strict'
// se requiere el models
import { Router, Request, Response } from 'express';
import { getColor, createColor, updateColor, deleteColor } from '../controllers/Color';
const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    var color = await getColor();
    res.json(color)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.post('/', async (req: Request, res: Response) => {
  try {
    var nColor = await createColor(req.body)
    res.json(nColor)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.put('/', async (req: Request, res: Response) => {
  try {
    var putColor = await updateColor(req.body)
    res.json(putColor)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
router.delete('/', async (req: Request, res: Response) => {
  try {
    var delColor = await deleteColor(req.body.id)
    res.json(delColor)
  } catch (e: any) {
    res.json({ error: e.message })
  }
})
export default router;